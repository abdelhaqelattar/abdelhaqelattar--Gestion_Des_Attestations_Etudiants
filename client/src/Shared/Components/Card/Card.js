import classes from "./Card.module.css";

const Card = ({title, cardFooter, children}) => {
    return (
        <div className={classes.Card}>
            {title && (
                <div className={classes.cardHeader}>
                    <h4>{title}</h4>
                </div>
            )}
            <div className={classes.cardBody}>
                {children}
            </div>
            <div className={classes.cardFooter}>
                {cardFooter}
            </div>
        </div>
    )
}

export default Card