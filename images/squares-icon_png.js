/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAkCAYAAAAtmaJzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAH1JREFUeNrs1sEJhEAMBdBRxGZswu1CLMIatBmxi7EU29g97VTgXEQceR9CLrk8CCRVuDDfqYup9eEhqcOLAwcHBwcHBwcHd2uaYfzlHt1jW9ujSFyqmJlZUs3WEg4ODg6u0Dv3yR3xYnHp+9itJRwcHBwcHBwcHNx5/gIMALO+DNb1Gsp2AAAAAElFTkSuQmCC';
export default image;