import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OptionsType } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { UiFileInputButton } from '../../components/uifileinput';
import Spinner from '../../components/spinner';
import classes from './Video.module.css';
import instance, {clientUrl } from '../../utils/axios';
import MyList from '../../components/lists/lists';
import historyType from '../../interfaces/history';
type sizeType = {
    value: string;
    label: string;
};
const sizeOptions: sizeType[] = [
    { value: '?x240', label: '240p' },
    { value: '?x480', label: '480p' },
    { value: '?x720', label: '720p' },
    { value: '?x1080', label: '1080p' },
    { value: '?x2160', label: '2160p' }
];

const validateSize = (value: string): boolean => {
    const splitted = value.split('x');
    const width = splitted[0];
    const height = splitted[1];
    if (!width || !height) return false;
    if (width === '?' && height === '?') return false;
    let isWidthValid = false;
    let isHeightValid = false;
    if (width === '?') {
        isWidthValid = true;
    } else {
        isWidthValid = !isNaN(Number(width));
    }
    if (height === '?') {
        isHeightValid = true;
    } else {
        isHeightValid = !isNaN(Number(height));
    }
    return isWidthValid && isHeightValid;
}

function VideoConverter() {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [keepDAR, setKeepDAR] = useState<boolean>(true);
    const [sameThumbnail, setSameThumbnail] = useState<boolean>(false);
    const [currentSize, setCurrentSize] = useState<OptionsType<sizeType>>([]);
    const [currentThumbnailSize, setCurrentThumbnailSize] = useState<OptionsType<sizeType>>([]);
    const [histories, setHistories] = useState<historyType[]>([]);
    const [isUploadingToS3, setUploadingToS3] = useState<boolean>();

    const handleSizeChange = (options: OptionsType<sizeType>) => {
        setCurrentSize(options);
    }

    const handleThumbnailSizeChange = (options: OptionsType<sizeType>) => {
        setCurrentThumbnailSize(options);
    }
    const handleButton = async (formData: FormData) => {
        const sizes = [];
        let thumbnailSizes = [];
        for(let size of currentSize as any[]){
            if(size['__isNew__']){
                if(!validateSize(size.value)){
                    setError(`Invalid Video Resolution Detected. ${size.value}`);
                    return;
                }
                sizes.push(size.value);
            } else {
                sizes.push(size.value);
            }
        }
        if(sameThumbnail){
            thumbnailSizes = [...sizes];
        } else {
            for(let size of currentThumbnailSize as any[]){
                if(size['__isNew__']){
                    if(!validateSize(size.value)){
                        setError(`Invalid Thumbnail Resolution Detected. ${size.value}`);
                        return;
                    }
                    thumbnailSizes.push(size.value);
                } else {
                    thumbnailSizes.push(size.value);
                }
            }
        }
        setError(null);

        formData.append('sizes', JSON.stringify(sizes));
        formData.append('thumbnailSizes', JSON.stringify(thumbnailSizes));
        formData.append('keepDAR', `${keepDAR}`);
        setIsUploading(true);
        setUploadProgress(0);
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            onUploadProgress: (e) => {
                const _progress = e.loaded * 100 / e.total;
                if (_progress < 99) {
                    setUploadProgress(Number(_progress.toFixed(2)));
                } else {
                    setIsUploading(false);
                    setUploadProgress(0);
                    setUploadingToS3(true);
                }
            },
        };
        
    const response =  await instance.post('videoconvert/resize', formData, config);
       setUploadingToS3(false);
       if(response.data.error){
        alert(response.data.error);
        return;
    }
    getHistory();
 
    }
    const getHistory = async () => {
        setIsUploading(true);
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },

        };
        const response = await instance.get('history/video', config);
        setIsUploading(false);
        if(response.data.error){
            alert(response.data.error);
            return;
        }
        setHistories(response.data.files);
    }
    const deleteVideo = async (id: number) => {
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'DELETE', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
        };
        await instance.delete('files/video/' + id, config);
        const response = await instance.get('history/video');
        setIsUploading(false);
        if(response.data.error){
            alert(response.data.error);
            return;
        }
        setHistories(response.data.files);
    }
    const deleteVideoPermanent = async (id: number) => {
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'DELETE', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
        };
        await instance.delete('files/videoPermanent/' + id, config);
        const response = await instance.get('history/video');
        setIsUploading(false);
        if(response.data.error){
            alert(response.data.error);
            return;
        }
        setHistories(response.data.files);
    }
    const dClasses = [classes.Centered, classes.Button].join(' ');
    let spinner = null;
    let progressMessage = null;
    let downloadAllButton = null;
    let downloadZipButton = null;
    let historyButton = null;
    if (isUploading) {
        spinner = <div className={classes.Centered}><Spinner /></div>;
        progressMessage = uploadProgress !== 0 ? <div className={classes.Centered}>{uploadProgress}% Uploaded</div> : null;
    } else if (isUploadingToS3){
        spinner = <div className={classes.Centered}><Spinner /></div>;
        progressMessage = uploadProgress !== 0 ? <div className={classes.Centered}>Uploading to Bucket</div> : null;
    }
    else {
        historyButton = <div className={dClasses} onClick={getHistory}>History</div>;
    }
    const sizeSelects = (
        <div className={classes.SelectContainer}>
        <CreatableSelect placeholder='Select Video Resolutions' className={classes.VideoSelect} isMulti options={sizeOptions}  onChange={handleSizeChange} />
    </div>
    );
    const thumbnailSizeSelects = (
        <div className={classes.SelectContainer}>
        <CreatableSelect placeholder='Select Thumbnail Resolutions' className={classes.ThumbSelect} isMulti options={sizeOptions}  onChange={handleThumbnailSizeChange} isDisabled={sameThumbnail} />
    </div>
    );

    let errorMessage = null;
    if (error) {
        errorMessage = <div className={classes.Centered}>{error}</div>;
    }
    const historyList = histories.length !== 0 ? <div className={classes.Centered}><MyList iconName='video.png' histories={histories} deletePDF={deleteVideo} deletePermanently={deleteVideoPermanent} /></div> : null;

    return (
        <div>
            <div className={classes.Grouped}>
                <div className={classes.UploadButton}>
                    <UiFileInputButton
                        label="Upload Video"
                        uploadFileName="video"
                        onChange={handleButton}
                        acceptedFileTypes="video/*"
                    />
                </div>
                <Link to='/'>
                    <div className={classes.Switch}>PDF Converter</div>
                </Link>
            </div>
            {errorMessage}
            <div className={classes.Centered}>
                <label>
                    <input type="checkbox" checked={keepDAR} onChange={(e) => setKeepDAR(e.target.checked)} />
                    Keep Aspect Ratio
                </label>
            </div>
            <div className={classes.Centered}>
                <label>
                    <input type="checkbox" checked={sameThumbnail} onChange={(e) => setSameThumbnail(e.target.checked)} />
                    Generate thumbnail same as video resolutions
                </label>
            </div>
            {sizeSelects}
            {thumbnailSizeSelects}
            {spinner}
            {progressMessage}
            <div className={classes.Centered}>
                {downloadAllButton}
                {downloadZipButton}
                {historyButton}
            </div>
            {historyList}

            <div className={classes.Clearfix}></div>

        </div>
    );
}
export default VideoConverter;