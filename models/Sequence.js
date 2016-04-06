export default class Sequence {
    constructor({ 
        sequence = '',
        reverse = false,
        complement = false,
        translate = false
    } = {}) {
        this._sequence = Sequence.validate(sequence);
        this._reverse = reverse;
        this._complement = complement;
        this._translate = translate;
    }

    get sequence() {
        var sequence = this._sequence

        if (this._reverse) sequence = this.getReverse(sequence);
        if (this._complement) sequence = this.getComplement(sequence);
        if (this._translate) sequence = this.getTranslation(sequence);

        return sequence;
    }

    set sequence(sequence) {
        this._sequence = sequence;
        return this;
    }

    reverse() {
        this._reverse = !this._reverse;
        return this;
    }

    complement() {
        this._complement = !this._complement;
        return this;
    }

    translate() {
        this._translate = !this._translate;
        return this;
    }

    getReverse(sequence = this._sequence) {
        return sequence.split('').reverse().join('');
    }

    getComplement(sequence = this._sequence) {
        var complement = [];

        const complements = {
            'a': 't',
            't': 'a',
            'c': 'g',
            'g': 'c'
        };

        for (let base of sequence) {
            complement.push(complements[base]);
        }

        return complement.join('');
    }

    _getAminoAcid(b1, b2, b3) {
        const aaMap = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';

        const base2index = (base) => {
            switch(base) {
                case 't': return 0;
                case 'c': return 1;
                case 'a': return 2;
                case 'g': return 3;
            }
        };

        return aaMap[ base2index(b1) * 16 + base2index(b2) * 4 + base2index(b3) ];
    }

    // code adapted from Pierre Lindenbaum, http://plindenbaum.blogspot.com
    getTranslation(sequence = this_sequence) {
        var protein = '';

        for (let i = 0; i + 2 < sequence.length; i += 3) {
            protein += this._getAminoAcid(sequence[i], sequence[i + 1], sequence[i + 2]);
        }      

        return protein;
    }

    static clean(sequence) {
        const sequenceCleaner = /[actg]*/g;
        return sequence.toLowerCase().match(sequenceCleaner).join('');
    }

    static validate(sequence) {
        var sequence = this.clean(sequence);
        return sequence;
    }
}