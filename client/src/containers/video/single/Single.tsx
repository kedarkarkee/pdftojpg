import { AxiosRequestConfig } from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import instance, { baseURL, clientUrl } from '../../../utils/axios';
import converted from '../../../interfaces/converted';
import classes from '../../../components/lists/l.module.css';

const getResolution = (r: string) => {
    const rs = r.split('x');
    if (rs[0] === '?') return `${rs[1]}p`;
    return rs[0] + ' x ' + rs[1];
}

function SingleVideo(props: RouteComponentProps<{ id: string }>): ReactElement {
    const { id } = props.match.params;
    const [videos, setVideos] = useState<converted[]>([]);
    useEffect(() => {
        const config: AxiosRequestConfig = {
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': clientUrl, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },

        };
        instance.get('videoconvert/converted/' + id, config).then((res) => {
            if(res.data.error){
                alert(res.data.error);
                return;
            }
            setVideos(res.data);
        });
    }, [id]);
    const ulClasses = [classes.W3ul, classes.W3Card4].join(' ');
    const imgClasses = [classes.BarItem, classes.Circle, classes.HideSmall, classes.Img, classes.Right].join(' ');
    const convertedVideos = videos.filter(v => v.isThumbnail === 0);
    const generatedThumbnails = videos.filter(v => v.isThumbnail === 1);
    const items = convertedVideos.map(v => <li className={classes.Bar} key={v.id}>
        <div className={classes.BarItem}>
            <span className={classes.Large}>{v.fileName}</span><br />
            <span>{getResolution(v.resolution)}</span>
        </div>
        <a href={baseURL + '/files/videoout/' + v.key} download>
            <img src={baseURL + "/assets/download.png"} alt="download" className={imgClasses} />
        </a>
    </li>);
    const thumbItems = generatedThumbnails.map(v => <li className={classes.Bar} key={v.id}>
        <div className={classes.BarItem}>
            <span className={classes.Large}>{v.fileName}</span><br />
            <span>{getResolution(v.resolution)}</span>
        </div>
        <a href={baseURL + '/files/thumbnail/' + v.key} download>
            <img src={baseURL + "/assets/download.png"} alt="download" className={imgClasses} />
        </a>
    </li>);
    return (
        <>
            <div>
                <h3>Converted Videos</h3>
            </div>
            <ul className={ulClasses}>
                {items}
            </ul>
            <div>
                <h3>Generated Thumbnails</h3>
            </div>
            <ul className={ulClasses}>
                {thumbItems}
            </ul>
        </>
    );
}

export default withRouter(SingleVideo);