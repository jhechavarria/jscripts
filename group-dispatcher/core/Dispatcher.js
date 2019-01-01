const NumberArray = require('./NumberArray');
const Group = require('./Group');
const { performance } = require('perf_hooks');

module.exports = class Dispatcher
{
    constructor(reference, groups, lowOverlap=true)
    {
        this.setReference(reference);
        this.setGroups(groups);
        this.setDivider();
        this.setOverlap(lowOverlap);
        this.timeout = 3500;
    }

    setReference(reference)
    {
        if (reference instanceof NumberArray)
            this.reference = reference;
        else
        {
            this.reference = new NumberArray();
            this.reference.hydrate(reference);
        }
    }

    setGroups(groups)
    {
        if (typeof groups == "object")
        {
            this.groups = groups;
            return ;
        }

        var limit = Math.floor(this.reference.length / groups);
        var rest = this.reference.length % groups;
        this.groups = [];

        for (var i = 0; i < groups; i++)
        {
            if (i == (groups - rest))
                this.groups.push(new Group(limit + 1));
            else
                this.groups.push(new Group(limit));
        }
    }

    setDivider()
    {
        this.divider = this.reference.sum() / this.groups.length;
    }

    setOverlap(lowOverlap=true)
    {
        var editable = this.reference.copy();
        this.overlap = 0;

        for (var i = 0; i < this.reference.length; i++)
        {
            if (!lowOverlap)
                this.overlap = reference.max(i);
            else
            {
                this.overlap += editable.avg();
                editable.remove(editable.max());
            }
            if (this.overlap > this.divider)
                break;
        }
    }

    isReady()
    {
        for (var index in this.groups)
        {
            var group = this.groups[index];

            if (!group.isReady(this.overlap))
                return false;
        }
        return true;
    }

    start(selectorCallback=null)
    {
        if (this.reference.length < this.groups.length)
            return false;

        var start = performance.now();

        while (!this.isReady())
        {
            var editable = this.reference.copy();
            var end = performance.now();

            if ((end - start) >= this.timeout)
            {
                console.error('Dispatch timed out');
                return false;
            }

            for (var index in this.groups)
            {
                var limit = this.groups[index].limit;
                this.groups[index].reset();

                for (var i = 0; i < limit; i++)
                {
                    if (typeof selectorCallback == 'function')
                        var value = selectorCallback(editable);
                    else
                        var value = editable.random();

                    this.groups[index].add(value);
                    editable.remove(value);
                }
            }
        }
        return true;
    }

    printConfig()
    {
        console.log("Niveaux: " + this.reference);
        console.log("Nombre de niveaux: " + this.reference.length);
        console.log("Cumul des niveaux: " + this.reference.sum());
        console.log("Plus haut niveau: " + this.reference.max());
        console.log("Tiers moyen: " + this.divider);
        console.log("Marge d'erreur: " + this.overlap);
        console.log("\n");
    }

    print()
    {
        if (!this.isReady())
            return false;

        this.printConfig();

        for (var index in this.groups)
        {
            var group = this.groups[index];

            console.log("Groupe " + (index + 1) + ": " + group.max + " joueurs");
            console.log(group.values);
            console.log("Cumul: " + group.values.sum());
            console.log("\n");
        }
    }
}