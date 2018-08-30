'use strict';

const Audit = require('lighthouse').Audit;

const MAX_API_TIME = 3000;
// Lo dejo en 3 segundos, pero en mi PC se demora 3785 milisegundos por
// lo cual el audit ratp pwa metrics tiene 50% en el html generado

class LoadApiAudit extends Audit {
    static get meta() {
        return {
            category: 'MyPerformance',
            name: 'api-audit',
            description: 'First API call done fast enough',
            failureDescription: 'First API call is too slow',
            helpText: 'Used to measure time from navigationStart to when the first' +
            ' API call is done',

            requiredArtifacts: ['TimeToFirstApi']
        };
    }

    static audit(artifacts) {
        const loadedTime = artifacts.TimeToFirstApi;

        const belowThreshold = loadedTime <= MAX_API_TIME;

        return {
            rawValue: loadedTime,
            score: belowThreshold
        };
    }
}

module.exports = LoadApiAudit;
