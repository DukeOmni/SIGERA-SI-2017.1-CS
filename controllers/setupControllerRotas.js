var seed = require('../models/dbModel');

module.exports = function(express_app){
    express_app.get('/api/setup/rotas',function(req,res){
        var seedRotas = [{
            origem:["-16.763094,-49.2635578"],
            waypoint:[{
                location:{
                    lat:-16.7004399,
                    lng:-49.276539000000014
                },
                stopover:true
            },
            {
                location:{
                    lat:-16.6767339,
                    lng:-49.246098399999994},
                    stopover:true},
            {
                location:{
                    lat:-16.6806193,
                    lng:-49.25633749999997},
                    stopover:true}
            ],
            destino:"Goiânia, UFG campus samambaia, Reitoria UFG",
            data:"2017-06-24T18:24:53.131Z",
            serial:"twGa"
        }];
            seed.Rota().create(seedRotas,function(err,results){
                if(err)throw err;
                res.send(results);
            });
// end function
});
};