import "./table.css";

function row(r) {
    console.log("Hi")
    return (
        <tr>
            <td>{r.name}</td>
            <td>{r.rank}</td>
            <td>{r.owner}</td>
            <td>{r.distance}</td>
        </tr>
    )
}

function leaderboardPage() {

    var rowData = [
        {name: "Harry", rank: "1st", owner: "Ben", distance: "10km"},
        {name: "Gromit", rank: "2nd", owner: "Anna", distance: "15km"},
        {name: "Gromit", rank: "3nd", owner: "Anna", distance: "15km"}
    ];

    return (
        <div id="leaderboardPage">
            <h1>Leaderboard</h1>
            <table id="leaderboard">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>Owner</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    
                    { rowData.map(function (r){
                        return row(r);
                    }) }
                    
                </tbody>
            </table>
        </div>
        
    ) 
}

export default leaderboardPage;