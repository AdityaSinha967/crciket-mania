
const CRICKET_API_KEY = 'de190f7damshed52b841aea324bp12a330jsn81e707d78c17'; 
const CRICKET_API_HOST = 'cricket-live-line1.p.rapidapi.com';
const PLAYER_RANKING_ENDPOINT = 'https://cricket-live-line1.p.rapidapi.com/playerRanking/1'; 

async function getPlayerRankings() {
    const rankingsContainer = document.getElementById('player-rankings-container'); 
    if (!rankingsContainer) {
        console.error("Error: Element with ID 'player-rankings-container' not found in the HTML.");
        return; 
    }
    rankingsContainer.innerHTML = 'Loading player rankings...'; 

    try {
        const response = await fetch(PLAYER_RANKING_ENDPOINT, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': CRICKET_API_KEY,
                'x-rapidapi-host': CRICKET_API_HOST,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP error! Status: ${response.status}`, errorText);
            throw new Error(`Failed to fetch rankings: ${response.status} ${response.statusText}. Details: ${errorText.substring(0, 100)}...`);
        }

        const data = await response.json();
        console.log("Fetched Player Rankings Data:", data); 

        rankingsContainer.innerHTML = ''; 

        
        const players = data?.data;

        if (Array.isArray(players) && players.length > 0) {
            const heading = document.createElement('h2');
            heading.textContent = 'Top Player Rankings'; 
            rankingsContainer.appendChild(heading);

            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Country</th>
                        <th>Rating</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector('tbody');

            players.forEach(player => {
                const row = document.createElement('tr');
               
                const rank = player.rank;
                const playerName = player.name;
                const country = player.country;
                const rating = player.rating;
                const playerImg = player.img; 

                row.innerHTML = `
                    <td>${rank}</td>
                    <td>${playerName}</td>
                    <td>${country}</td>
                    <td>${rating}</td>
                    <td><img src="${playerImg}" alt="${playerName}" width="50" height="50" style="border-radius: 50%;"></td>
                `;
                tbody.appendChild(row);
            });
            rankingsContainer.appendChild(table);

        } else {
            
            rankingsContainer.innerHTML = '<p>No player rankings currently available from the API.</p>';
        }

    } catch (error) {
        console.error("Error fetching player rankings:", error);
        rankingsContainer.innerHTML = `<p style="color: red;">Error loading player rankings: ${error.message}</p>`;
    }
}


getPlayerRankings();

