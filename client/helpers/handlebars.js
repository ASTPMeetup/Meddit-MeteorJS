/**
 * Created by Piero on 6/26/2017.
 */
Template.registerHelper('pluralize', function(num, thing){
    if(num === 1) {
        return '1 ' + thing;
    }
    else {
        return num + ' ' + thing + 's';
    }
});