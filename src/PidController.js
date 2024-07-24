/**
 * Inspired from https://gist.github.com/DzikuVx/f8b146747c029947a996b9a3b070d5e7
 */


export default class PidController {

    constructor() {
        this.target = null;
        this.gains = {
            P: null,
            I: null,
            D: null
        };
        this.Iterm = 0;
        this.ItermLimit = {
            min: -1000,
            max: 1000
        };
        this.previousError = 0;
        this.output = {
            min: null,
            max: null,
            minThreshold: null
        };
    }

    /**
     *
     * @param {number} value
     */
    setTarget = function (value) {
        this.target = value;
    };

    /**
     * @param {number} Pgain
     * @param {number} Igain
     * @param {number} Dgain
     */
    setGains = function (Pgain, Igain, Dgain) {
        this.gains.P = Pgain;
        this.gains.I = Igain;
        this.gains.D = Dgain;
    };

    /**
     * Sets min and max value for output
     * @param {number} min
     * @param {number} max
     * @param {number} minThreshold if output is below this value, [min] is returned
     */
    setOutput = function (min, max, minThreshold) {
        this.output.min = min;
        this.output.max = max;
        this.output.minThreshold = minThreshold;
    };

    /**
     * Sets upper and lower limit for Iterm accumulator
     * @param {number} min
     * @param {number} max
     */
    setItermLimit = function (min, max) {
        this.ItermLimit.min = min;
        this.ItermLimit.max = max;
    };

    /**
     * Executes PID controller based on current value and target
     * @param {number} current
     * @returns {number}
     */
    run = function (current) {
        var error = current - this.target,
            Pterm = error * this.gains.P,
            Dterm = (error - this.previousError) * this.gains.D,
            output;

        this.previousError = error;

        this.Iterm += error * this.gains.I;
        if (this.Iterm > this.ItermLimit.max) {
            this.Iterm = this.ItermLimit.max;
        } else if (this.Iterm < this.ItermLimit.min) {
            this.Iterm = this.ItermLimit.min;
        }

        output = Pterm + this.Iterm + Dterm;
        if (output < this.output.minThreshold) {
            output = this.output.min;
        } else if (output > this.output.max) {
            output = this.output.max;
        }

        return output;
    };

}