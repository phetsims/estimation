/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAbCAYAAAAqCUKuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtFJREFUeNrsmM1vElEQwN/CAxYQWz+iTUxbjInejD14sImJiR+JiQdNPPhxaf8Cy8Ez+hdU/oGmPXky9D9ojQd7sIFqm4ItWZQqa/noCiwLy8I6S14jqbtmWRbZjUwymeybfRP4ZWbevKWQDeXRE5HOfHU8H59oMWbGFcUa3txam8Q2BHIWzFOfX54A2zQrbrnMBZKf108XCmwW2wzIVTC3zY7Lsl/O7KY+UjxfyirP2C7lAuYe6EWzY+/sxCf3vu1WRLHOH65hm5TLQ9ARM+MKAu9NJtfHcvnvuVarKXX6sMWBXAZzC5Q2My7H5U5sJz4ESqViVs1PWRXI9HXxgduDprX8fIUa9x+TM93GrQl5P8OsCp3lclQsmyk/cigApqTlr9dQ1UNr+zWP3TqP/wZEEQcainamQP0Gwcxovbix8S69vXVz8b+BAkDmwIRBR4++IEki+rT5Hu3v763CY7dQbpC4EdBl20C5c1dcKVfaP15l7OVRMvkWpr0Do/EVkM9Ao6Bp0CUCNm1pKClGHUg7SxqVXoAcSohkTJBkTZhkTYRAs5z02mhlHcqolOV90BXim1MrWztD6VWCpLxmLHn6GJSXOt8Lq6wtkx5juQbcDZS4ytoLHfs6s4AjjTZi5WarF8riQX42ZCC+0ivmSUNdMnCkI6cT0SPH0bU/DwF5FLtQUBAqiK86Yg6Hj/uXUEIA5FUPPWPKaFb4feg8AHlMUSoXQhq1T8ZiMYNc7nNpU6GkEu5+XgrjRjd6aTTl9aJZsaHu/8llUImMC1IDjzUlfX9DktyBpnSqqnmcyo41y14IhRq6Aqrtr/6en7BLYjGWdX2vperiSSculDXcMaiKqO2+0fZRogAkNrwlqwAZQlEBYsbwNnChKBfrdAayBrYqHes1AGHMnmgHDsRDX1igKHfNAJAFAML2Y8wfmMhyI0HTl+YNACmCvtECosgvAQYAKTUa8spYOf0AAAAASUVORK5CYII=';
export default image;