module.exports = class NumberArray extends Array
{
    sum()
    {
        var sum = 0;

        for (var index in this)
        {
            sum += this[index];
        }

        return sum;
    }

    max(cells=1)
    {
        var cpy = this.copy().sort();
        var max = 0;

        for (var i = 0; i < cells; i++)
        {
            var val = cpy[cpy.length - i - 1];
            max += new Number(val);
        }

        return max;
    }

    min(cells=1)
    {
        var cpy = this.copy().sort();
        var max = 0;

        for (var i = 0; i < cells; i++)
        {
            var val = cpy[i];
            max += new Number(val);
        }

        return max;
    }

    avg()
    {
        var sum = this.sum();

        return this.length ? sum / this.length : false;
    }

    copy()
    {
        var cpy = new this.constructor();

        for (var index in this)
        {
            cpy.push(this[index]);
        }

        return cpy;
    }

    percent(percent)
    {
        var total = this.sum();

        return sum * (percent / 100);
    }

    random()
    {
        return this[Math.floor(Math.random() * this.length)];
    }

    remove(value, all=false)
    {
        if (all)
        {
            while (this.indexOf(value))
                this.remove(value);
            return ;
        }

        var index = this.indexOf(value);

        if (index > -1)
           this.splice(index, 1);
    }

    hydrate(array)
    {
        for (var index in array)
        {
            this.push(array[index]);
        }
    }
}