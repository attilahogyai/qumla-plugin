import Ember from 'ember';
import CommentAction from 'qumla-plugin/mixins/comment-actions';
import Subscription from 'qumla-plugin/models/subscription';
import {
    aggregateSum
}
from 'qumla-plugin/helpers/aggregate-sum';
import {
    groupBy
}
from 'qumla-plugin/helpers/group-by';
import App from 'qumla-plugin/app';

export
default Ember.Controller.extend(CommentAction, {
    optionStatRaw: null, //this is an answer-stat list
    highest: null,
    first: null,
    session: Ember.inject.service(),
    token: Ember.computed.readOnly('session.token'),
    question: null,
    votedOptions: [],

    // there are two data maps on for country and one for detail of clicked country as regionData. The navigation between them hapens from region-map (action up and set zoomCountry) and region maps stored both data 
    countryData: null,
    regionData: null,
    zoomCountry: null,
    percentageHistory: true,

    countryList: null,
    historyStatData: Ember.Object.extend({
        xaxis: null,
        series: null
    }).create(),
    followaddress: null,
    answerstathistoryRaw: null,

    summary: Ember.computed('optionStatRaw', function() {
        this.set("first", this.get('optionStatRaw').objectAt(0));
        var aggregatedByOption = aggregateSum(this.get('optionStatRaw'), 'option.id', 'count');
        var sortedList = aggregatedByOption.sortBy('count').reverse();
        var votedOptions = [];        
        for (var i = 0; i < sortedList.length; i++) {
            sortedList[i].set('option.color', Ember.colorList[i]);
            sortedList[i].set('option.index', i);
            sortedList[i].set('option.percent', sortedList[i].get('percent'));
            votedOptions.push(sortedList[i].get('option'));
        }
        Ember.Logger.debug(votedOptions);
        this.set('votedOptions', votedOptions);

        if (sortedList.length > 0 && sortedList[0].count > 1) {
            Ember.Logger.debug('top count:' + sortedList[0].count);
            this.set('highest', sortedList[0]);
        } else {
            this.set('highest', null);
        }

        return sortedList;
    })
});