import React from 'react';

const DayCard = (props) => {
    function pull() {
        console.log(props)
    }
    return (
        <div>
            hi hi hi
            {pull()}
        </div>
    );
}

export default DayCard;
