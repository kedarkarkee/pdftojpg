import { Link } from 'react-router-dom';
import classes from './l.module.css';
import {baseURL} from '../../utils/axios';
import historyType from '../../interfaces/history';
import ReactTooltip from 'react-tooltip';
interface propType {
    histories: historyType[];
    deletePDF: (id: number) => void;
    deletePermanently: (id: number) => void;
    iconName: string;
}

function MyList(props: propType) {
    const ulClasses = [classes.W3ul, classes.W3Card4].join(' ');
    const imgClasses = [classes.BarItem, classes.Circle, classes.HideSmall, classes.Img].join(' ');
    return (
        <ul className={ulClasses}>
            {props.histories.map(h => {
                const humanReadableDate = new Date(h.timestamp).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                let convertMessage = '';
                if(h.converted === 0){
                    convertMessage = `Converting ${h.finished} of ${h.total}`;
                } else if (h.converted === 2){
                    convertMessage = 'Error';
                }
                return (<li className={classes.Bar} key={h.id}>

                <img src={baseURL + "/assets/" + props.iconName} alt="video icon" className={imgClasses} />
                    <Link to={`/video/${h.id}`}>
                    <div className={classes.BarItem}>
                        <span className={classes.Large}>{h.fileName}</span><br />
                        <span>{humanReadableDate}</span>
                    </div>
                    </Link>
                    <div data-tip="Clear History" data-for='clear' data-place='top'>
                    <span className={classes.Arrow} onClick={() => props.deletePDF(h.id)}></span>
                        <ReactTooltip id="clear" />
                    </div>
                    <div data-tip="Delete Permanently" data-for='delete' data-place='top'>
                    <span className={classes.Trash} onClick={() => props.deletePermanently(h.id)}></span>
                    <ReactTooltip id="delete" />
                    </div>
                    {h.converted !== 1 ? <span className={classes.Converting}>{convertMessage}</span> : null}
                </li>);
            })}

        </ul>
    );
}
export default MyList;