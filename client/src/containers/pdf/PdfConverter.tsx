import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UiFileInputButton } from '../../components/uifileinput';
import Spinner from '../../components/spinner';
import fileDownload from 'js-file-download';
import classes from './PdfConverter.module.css';
import instance, { baseURL, clientUrl } from '../../utils/axios';
import { pdfHistoryType } from '../../interfaces/history';
import PdfHistoryList from '../../components/lists/pdf/pdf-history-list';
import { convertedImageType } from '../../interfaces/converted';

function PdfConverter() {
    const [convertedImages, setConvertedImages] = useState<convertedImageType[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isUploadingtoS3, setIsUploadingtoS3] = useState<boolean>(false);
    const [histories, setHistories] = useState<pdfHistoryType[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const handleAllDownloads = async () => {

        for (let img of convertedImages) {
            await handleDownload(img);
        }
    }
    const handleDownload = async (img: convertedImageType) => {
        const config: AxiosRequestConfig = {
            responseType: 'blob',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        };
        const response = await instance.get('files/' + img.key, config);
        if (response.data.error) {
            alert(response.data.error);
            return;
        }
        const blob = new Blob([response.data], { type: 'image/jpg' });
        fileDownload(blob, img.key);
    }

    const handleButton = async (formData: any) => {
        setIsUploading(true);
        setConvertedImages([]);
        setHistories([]);
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
                    if (!isUploadingtoS3) {
                        setIsUploadingtoS3(true);
                    }
                }
            },
        };
        const response = await instance.post('convert/jpg', formData, config);
        setIsUploadingtoS3(false);
        setIsUploading(false);
        setUploadProgress(0);
        if (response.data.error) {
            alert(response.data.error);
            return;
        }
        getHistory();
    }
    const getHistory = async () => {
        setIsUploading(true);
        setConvertedImages([]);
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },

        };
        const response = await instance.get('history/pdf', config);
        setIsUploading(false);
        if (response.data.error) {
            alert(response.data.error);
            return;
        }
        setHistories(response.data.files);
    }
    const showExisting = async (id: number) => {
        setIsUploading(true);
        setConvertedImages([]);
        setHistories([]);
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
        };
        const response = await instance.get('convert/jpg/' + id, config);
        setIsUploading(false);
        if (response.data.error) {
            alert(response.data.error);
            return;
        }
        setConvertedImages(response.data.files);
    }
    const deletePDF = async (id: number) => {
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'DELETE', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
        };
        await instance.delete('files/pdf/' + id, config);
        const response = await instance.get('history/pdf');
        setIsUploading(false);
        if (response.data.error) {
            alert(response.data.error);
            return;
        }
        setHistories(response.data.files);

    }
    const deletePermanently = async (id: number) => {
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'DELETE', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
        };
        await instance.delete('files/pdfPermanent/' + id, config);
        const response = await instance.get('history/pdf');
        setIsUploading(false);
        if (response.data.error) {
            alert(response.data.error);
            return;
        }
        setHistories(response.data.files);

    }
    const dClasses = [classes.Centered, classes.Button].join(' ');
    let spinner = null;
    let downloadAllButton = null;
    // let downloadZipButton = null;
    let historyButton = null;
    let progressMessage = null;
    if (isUploading) {
        spinner = <div className={classes.Centered}><Spinner /></div>;
        progressMessage = <div className={classes.Centered}>{isUploadingtoS3 ? 'Uploading to S3' : `${uploadProgress}% Uploaded`}</div>;
    } else {
        historyButton = <div className={dClasses} onClick={getHistory}>History</div>;
        if (convertedImages.length !== 0) {
            downloadAllButton = <div className={dClasses} onClick={() => handleAllDownloads()}>Download All</div>;
            // const zipName = convertedImages[0].fileName.replace('pdf', 'zip');
            // downloadZipButton = (
            //     <a href={baseURL + '/files/pdfout/' + zipName} download>
            //         <div className={dClasses}>Download As Zip</div>
            //     </a>
            // );
        }
    }
    const historyList = histories.length !== 0 ? <div className={classes.Centered}><PdfHistoryList histories={histories} deletePDF={deletePDF} deletePermanently={deletePermanently} showExisting={showExisting} /></div> : null;


    return (
        <div>
            <div className={classes.Grouped}>
                <div className={classes.UploadButton}>
                    <UiFileInputButton
                        label="Upload PDF"
                        uploadFileName="pdf"
                        onChange={handleButton}
                        acceptedFileTypes=".pdf"
                    />
                </div>
                <Link to='/video'>
                    <div className={classes.Switch}>Video Converter</div>
                </Link>
            </div>
            {spinner}
            {progressMessage}
            <div className={classes.Centered}>
                {downloadAllButton}
                {/* {downloadZipButton} */}
                {historyButton}
            </div>

            {historyList}
            <div className={classes.Centered}>
                {
                    convertedImages.map((imageData) => {
                        return (
                            <div className={classes.Responsive} key={imageData.id}>
                                <div className={classes.Gallery}>
                                    <a target="_blank" rel='noreferrer' href={`${baseURL}/files/pdfout/${imageData.key}`}>
                                        <img src={`${baseURL}/files/pdfout/${imageData.key}`} alt={imageData.key} width="600" height="400" />
                                    </a>
                                    <a href={`${baseURL}/files/pdfout/${imageData.key}`} download>
                                        <div className={classes.Button}>Download Page {imageData.page}</div>
                                    </a>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={classes.Clearfix}></div>

        </div>
    );
}

export default PdfConverter;