# Zef's Battle Game

**An open battle game with character cards.**

&nbsp;

## Game Rules

This game is an open battle that is played by two or more.

Each player receives a certain number of cards, distributed randomly at the start of the game. These cards each contain a character who has characteristics with a certain number of points for each of them.

Each turn, players choose one of their cards and play it face down. When all players have chosen their card, they are turned face up and compared. The card with the highest sum of points wins the round and allows the player who owns it to collect the other cards. These recovered cards can no longer be played.

The game ends when all players have used all their cards and the winner is the one who has won the most cards.

&nbsp;

## The project

This project contains a back-end part with a server based on Node.js and Express as well as a PostgreSQL database and a front-end part made with React and Redux.

&nbsp;

## Start the project

### Back-end

- In the [zef-battle-server](./zef-battle-server) folder, install Node globally and the NPM dependencies
- Create a PostgreSQL database, install [sqitch](https://sqitch.org), configure sqitch configuration in a file named sqitch.conf by copying the sample file.
- Then deploy the database structure with this sqitch command:
 ```sh
 sqitch deploy
 ```
- Configure environment variables in an .env file following the sample file
- Finally, start the API :
```sh
npm start
```

### Front-end
- In the [zef-battle](./zef-battle) folder, install the NPM dependencies
- And just start the application :
```sh
npm start
```
