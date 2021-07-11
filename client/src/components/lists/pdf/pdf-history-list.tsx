import ReactTooltip from 'react-tooltip';
import classes from '../l.module.css';
import {baseURL} from '../../../utils/axios';
import {pdfHistoryType} from '../../../interfaces/history';
interface propType {
    histories: pdfHistoryType[];
    deletePDF: (id: number) => void;
    deletePermanently: (id: number) => void;
    showExisting: (id: number) => void;
}

function PdfHistoryList(props: propType) {
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
                return (<li className={classes.Bar} key={h.id}>
                    <a href={baseURL + '/files/pdfin/' + h.key}>

                <img src={baseURL + '/assets/pdf.png'} alt="pdf icon" className={imgClasses} />
                    </a>
                    <div className={classes.BarItem} onClick={() => props.showExisting(h.id)}>
                        <span className={classes.Large}>{h.fileName}</span><br />
                        <span>{humanReadableDate}</span>
                    </div>
                    <div data-tip="Clear History" data-for='clear' data-place='top'>
                    <span className={classes.Arrow} onClick={() => props.deletePDF(h.id)}></span>
                    <ReactTooltip id="clear" />
                    </div>
                    <div data-tip="Delete Permanently" data-for='delete' data-place='top'>
                    <span className={classes.Trash} onClick={() => props.deletePermanently(h.id)}></span>
                    <ReactTooltip id="delete" />
                    </div>
                  
                    {<span className={classes.Converting}>{h.status}</span>}
                </li>);
            })}

        </ul>
    );
}
export default PdfHistoryList;