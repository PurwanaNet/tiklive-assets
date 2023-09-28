function joinedmsg (){
const welcomemsg = [
    "Selamat bergabung, @{usernames}! ðŸŽ‰ Mari kita buat live ini makin rame dengan tap-tap layar yang banyak! ðŸ‘",
    "Hai @{usernames}! Kunjungi CLSRM dot purwana dot net untuk memberikan dukunganmu ya! ðŸ’ª",
    "Selamat datang, @{usernames}! Kami terima donasi berupa mawar-mawar dari para fans setia! ðŸŒ¹",
    "Yuk, @{usernames}! Terima kotak harta untuk membuat live kita semakin seru! ðŸ’°",
    "Kompetisi tap-tap layar akan berakhir setiap 10 menit, @{usernames}! Ayo, tunjukkan kecepatanmu! â°ðŸ‘†",
    "Selamat bergabung, @{usernames}! Jangan lupa follow dan tap-tap layar, ya! ðŸ˜‰",
    "Mari sambut hangat @{usernames} di TikTok Live kita hari ini! ðŸ™Œ",
    "Hi @{usernames}! Selamat datang di live yang penuh keseruan ini! ðŸŽˆ",
    "Terima kasih sudah hadir, @{usernames}! Ayo, ramekan live ini dengan tap-tap layar yang semakin banyak! ðŸ‘",
    "Selamat datang di TikTok Live, @{usernames}! Jangan lupa kunjungi CLSRM dot purwana dot net ya! ðŸ“š",
    "Hai @{usernames}! Tap tap koin untuk donasinya yang berharga! ðŸ™",
    "Yuk, dukung live ini dengan memberikan kotak harta kepada @{usernames}! ðŸ’Ž",
    "Kompetisi tap-tap layar setiap 10 menit ya, @{usernames}! Ayo, semangat! ðŸ”¥",
    "Selamat bergabung, @{usernames}! Mari buat live ini makin meriah! ðŸŽŠ",
    "Hi @{usernames}! Semangat untuk live seru kita hari ini! ðŸ’ƒ",
    "Terima kasih, @{usernames}, sudah hadir di live ini! Ayo, tap-tap layar sebanyak mungkin! ðŸ‘†",
    "Selamat datang, @{usernames}! Jangan lupa follow dan bagikan live ini! ðŸ“¢",
    "Mari kita berikan sambutan hangat kepada @{usernames} di TikTok Live kita! ðŸ‘‹",
    "Hi @{usernames}! Ayo, buat live ini makin seru dengan komentar dan tap-tap layarmu! ðŸ’¬",
    "Terima kasih atas kehadiranmu, @{usernames}! Dukunganmu sangat berarti! ðŸ¤—",
    "Selamat datang di live kita, @{usernames}! Yuk, kunjungi CLSRM dot purwana dot net! ðŸ«",
    "Hai @{usernames}! Yuk kasih mawar-mawarnya yang cantik! ðŸŒ·",
    "Yuk, beri @{usernames} kotak harta agar live ini semakin meriah! ðŸŽ",
    "Kompetisi tap-tap layar akan berakhir setiap 10 menit, @{usernames}! Siap-siap ya! â³",
    "Selamat bergabung, @{usernames}! Mari kita rayakan live ini dengan semangat! ðŸ¥³"
    ];

    const randomIndex = Math.floor(Math.random() * welcomemsg.length);

    // Use the random index to select a random item from the array
    const randomItem = welcomemsg[randomIndex];
    return randomItem;
}
    let joinedUsers = [];

    let justmsg = '';

    let lastgiver = '';


    // Function to push an item to the queue and clean it if it exceeds the maximum size
    function pushToJoined(item) {
        // Define the maximum number of items in the queue
        const maxItems = 3;    
        joinedUsers.push(item); // Push the item to the queue

        // Check if the queue size exceeds the maximum
        if (joinedUsers.length > maxItems) {
            // Remove the oldest items from the beginning of the array
            joinedUsers.splice(0, joinedUsers.length - maxItems);
        }
    }
	
	
	// Open the IndexedDB database
	var db;
	var request = indexedDB.open('mydb', 1);

	// Create or update the leaderboard object store
	request.onupgradeneeded = function (event) {
		db = event.target.result;
		db.createObjectStore('leaderboard', { keyPath: 'username' });
	};

	request.onsuccess = function (event) {
		db = event.target.result;
		// You can perform your IndexedDB operations here

		// Function to insert or update a score
		function insertOrUpdateScore(username, score) {
			var transaction = db.transaction(['leaderboard'], 'readwrite');
			var store = transaction.objectStore('leaderboard');
			var request = store.put({ username: username, score: score });

			request.onsuccess = function (event) {
				//console.log('Score inserted or updated successfully');
			};

			request.onerror = function (event) {
				console.error('Failed to insert or update score');
			};
		}

		// Function to reset the leaderboard
		function resetLeaderboard() {
			var transaction = db.transaction(['leaderboard'], 'readwrite');
			var store = transaction.objectStore('leaderboard');
			var request = store.clear();

			request.onsuccess = function (event) {
				console.log('Leaderboard reset successfully.');
			};

			request.onerror = function (event) {
				console.error('Error resetting leaderboard: ' + event.target.error.message);
			};
		}
	};

	request.onerror = function (event) {
		console.error('Error opening database: ' + event.target.errorCode);
	};
	

	/*
    var db = openDatabase('mydb', '1.0', 'My Database', 2 * 1024 * 1024);

    // Create the leaderboard table if it doesn't exist
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS leaderboard (username TEXT PRIMARY KEY, score INTEGER)');
    });
    
    // Function to insert or update a score
    function insertOrUpdateScore(username, score) {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT OR REPLACE INTO leaderboard (username, score) VALUES (?, COALESCE((SELECT score FROM leaderboard WHERE username = ?), 0) + ?)',
                [username, username, score],
                function (tx, result) {
                    if (result.rowsAffected > 0) {
                        //console.log('Score inserted or updated successfully');
                    } else {
                        console.log('Failed to insert or update score');
                    }
                },
                function (tx, error) {
                    console.error('Error:', error.message);
                }
            );
        });
    }    

    function resetLeaderBoard(){
        if (!db) {
            console.error('Database error: Database not opened');
        } else {
            // Execute the SQL statement to update all scores to 0
            db.transaction(function (tx) {
                tx.executeSql('UPDATE leaderboard SET score = 0', [], function (tx, results) {
                    console.log('Scores updated successfully.');
                }, function (tx, error) {
                    console.error('Error updating scores: ' + error.message);
                });
            });
        }
    }*/
    /*
    function storeChat(username,text){
        if(text.includes('joined') && !username.startsWith('user')){
            pushToJoined(username);
        }else if(text.includes('liked the LIVE')){
            //todo next
            insertOrUpdateScore(username,1);
        }else if(text.includes('followed the LIVE creator')){
            justmsg = username+', Trimakasih sudah folow kita kita.';
        }else if(!text.includes('joined')){
            justmsg = text;
        }
    }
    
    function storeGift(username){
        lastgiver = username;
    }*/

    function regularSays(){
		//console.log('regularSays : ');
        if(joinedUsers.length > 0 || lastgiver != '' || justmsg != ''){
                let resultmsg = (justmsg!='')?justmsg+'.':'';
                resultmsg += (lastgiver!='')?lastgiver+', terimakasih sudah saling berbagi koin. ':'';
                resultmsg += joinedUsers.length > 0 ? joinedmsg().replaceAll('@{usernames}',joinedUsers.join(','))+'. ' : '';
                //console.log('say : '+resultmsg);
                //responsiveVoice.speak(resultmsg,"Indonesian Female");
				self.postMessage("says--delim--"+resultmsg);
                joinedUsers = [];
                lastgiver = '';
                justmsg = '';
                setTimeout(regularSays,3000);
        }else{
            setTimeout(regularSays,3000);
        }
    }

	/*
    function userTapTops(){
        let result = '';
        db.transaction(function(tx) {
            tx.executeSql(
              "SELECT username FROM leaderboard ORDER BY score DESC LIMIT 3",
              [],
              function(tx, result) {
                var usernames = [];
                for (var i = 0; i < result.rows.length; i++) {
                  usernames.push(result.rows.item(i).username);
                }
                console.log("Top 3 usernames by score:", usernames);
                result = usernames.join(',');
              },
              function(tx, error) {
                console.error("Error selecting usernames: " + error.message);
              }
            );
          });
          return result;
    }

    const clctime = 1000*60*10;

    function checkLikedCompetition(){
		console.log('checkLikedCompetition : ');
        db.transaction(function(tx) {
            tx.executeSql(
              "SELECT username FROM leaderboard WHERE score > 0 ORDER BY score DESC LIMIT 3",
              [],
              function(tx, result) {
                var usernames = [];
                for (var i = 0; i < result.rows.length; i++) {
                  usernames.push(result.rows.item(i).username);
                }
                console.log("Top 3 usernames by score:", usernames);
                let usertaptops = usernames.join(',');
                if(usernames.length > 0){
					self.postMessage('says--delim--'+'tap tap score sudah direset! nilai tertinggi adalah : '+usertaptops);
                    //responsiveVoice.speak('tap tap score sudah direset! nilai tertinggi adalah : '+usertaptops,"Indonesian Female");
                    //console.log('say : tap tap score direset');
                    resetLeaderBoard();
                    setTimeout(checkLikedCompetition,clctime);
                }else{
                    setTimeout(checkLikedCompetition,clctime);
                }                 
              },
              function(tx, error) {
                console.error("Error selecting usernames: " + error.message);
                setTimeout(checkLikedCompetition,clctime);
              }
            );
          });        
    }
	*/
	const clctime = 1000*60*10;
	
	function userTapTops() {
		let result = '';
		const transaction = db.transaction(['leaderboard'], 'readonly');
		const objectStore = transaction.objectStore('leaderboard');

		const index = objectStore.index('scoreIndex');
		const request = index.openCursor(null, 'prev');

		const usernames = [];

		request.onsuccess = function(event) {
			const cursor = event.target.result;
			if (cursor && usernames.length < 3) {
				usernames.push(cursor.value.username);
				cursor.continue();
			} else {
				console.log('Top 3 usernames by score:', usernames);
				result = usernames.join(',');
			}
		};

		transaction.onerror = function(event) {
			console.error('Error selecting usernames:', event.target.error);
		};

		return result;
	}

	function checkLikedCompetition() {
		console.log('checkLikedCompetition : ');

		const transaction = db.transaction(['leaderboard'], 'readonly');
		const objectStore = transaction.objectStore('leaderboard');

		const index = objectStore.index('scoreIndex');
		const request = index.openCursor(IDBKeyRange.lowerBound(1), 'prev');

		const usernames = [];

		request.onsuccess = function(event) {
			const cursor = event.target.result;
			if (cursor && usernames.length < 3) {
				usernames.push(cursor.value.username);
				cursor.continue();
			} else {
				console.log('Top 3 usernames by score:', usernames);
				const usertaptops = usernames.join(',');
				if (usernames.length > 0) {
					self.postMessage('says--delim--' + 'tap tap score sudah direset! nilai tertinggi adalah : ' + usertaptops);
					//responsiveVoice.speak('tap tap score sudah direset! nilai tertinggi adalah : '+usertaptops,"Indonesian Female");
					//console.log('say : tap tap score direset');
					resetLeaderBoard();
					setTimeout(checkLikedCompetition, clctime);
				} else {
					setTimeout(checkLikedCompetition, clctime);
				}
			}
		};

		transaction.onerror = function(event) {
			console.error('Error selecting usernames:', event.target.error);
			setTimeout(checkLikedCompetition, clctime);
		};
	}	

    setTimeout(regularSays,3000);
    setTimeout(checkLikedCompetition,clctime);

// Listen for messages from the main page
self.addEventListener('message', function(e) {
    // Split the message using '--delim--' as a delimiter
    const parts = e.data.split('--delim--');

    // Assuming the first part is the command and the rest is data
    const command = parts[0];
	console.log('command : '+command);
	if(command=='joined'){
		pushToJoined(parts[1]);
	}else if(command=='liked'){
		insertOrUpdateScore(parts[1],1);
	}else if(command=='justmsg'){
		justmsg = parts[1];
	}else if(command=='gifter'){
		lastgiver = parts[1];
	}

    // You can also send a response back to the main page if needed
    // self.postMessage("Data received and processed.");
}, false);
