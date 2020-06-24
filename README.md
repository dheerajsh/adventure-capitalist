## Adventure Capitalist

Adventure Capitalist is an idle business sim-game. The basic idea is to purchase a business, win
capital from that business, upgrade the business and then purchase more businesses.

The way to win capital in Adventure Capitalist is once you’ve purchased a business, you need to
click on the business and it takes some time to gain the capital. Once done, you can click again.

In order to automate this, you can hire a manager who can run the business for you, so you don’t
have to click manually anymore. Then you can upgrade the business and gain even more
money.

The game is idle, so it progresses while you are away: If you have a manager, the game
continue playing while you’re gone.

Working link [https://adventure-capitalists.web.app](https://adventure-capitalists.web.app)

## Instructions
1. Click on the Business Image to make money
2. Buy more units of same business by clicking `Buy x1` button.
3. Buy more business when you sufficent balance by clicking on the business.
4. From the left side buy managers that to automate money making from business
5. And also you can buy upgraders to mulitiply your profit from the business.

## UI

The UI of the game is build using Reactjs and to communicate state between different components Reduxjs is being used.

## Architecture and Technical Chioces
1. Challange and Solution: The main challenge here was to communicate among different components For. eg. when a business made money, it should be reflacted in total balance or When an manager get hired it shuold be able to run the business without user interaction.
To Solve this problem I used redux store to share the state of the business across component. Components can individually able to update the state and other will receive the update immediatly and asynchronously.
2.Focus: The solution is focus on Front-end only as there wasn't a necessity to use any backend service for the given requirements.
3. Reasoning : Async communicattion and a pesistent state of the game led me to use react and redux based solution. By having a pesistent state on browser I was able to achieve the feature of idle game i.e, the game was running while you were offline.
I was able to acheive that by recalculating the time user was offline and the active running managers user had without actually running a worker on the background.
4. Trade off: Some of the features from the original game were intentionally left out due to time constrant, for example changing the price for buying another unit of a business based on how many units user bought so far. UI is also pretty basic using raw bootstrap components, which could be more appealing if time would have allowed.
5. Link to the hosted application: [https://adventure-capitalists.web.app](https://adventure-capitalists.web.app)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


