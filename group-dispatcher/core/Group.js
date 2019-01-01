const NumberArray = require('./NumberArray');

module.exports = class Group
{
    constructor(limit)
    {
        this.values = new NumberArray();
        this.limit = limit;
    }

    add(value)
    {
        if (!this.full())
            this.values.push(value);
    }

    remove(value)
    {
        this.values.remove(value);
    }

    reset()
    {
        this.values.length = 0;
    }

    busy()
    {
        return this.values.length;
    }

    full()
    {
        return this.busy() >= this.limit;
    }

    isReady(overlap)
    {
        return this.full() && this.values.sum() <= overlap;
    }

    debug(overlap=null)
    {
        console.log("\n");
        if (overlap)
            console.log("Overlap: " + overlap);
        console.log("Limit: " + this.limit);
        console.log("Values: " + this.values);
        console.log("Amount: " + this.values.length);
        console.log("Sum: " + this.values.sum());
        console.log("Busy : " + this.busy());
        console.log("Full : " + this.full());
        if (overlap)
            console.log("Ready : " + this.isReady(overlap));
        console.log("\n");
    }
}