var app = angular.module("SvgEffect", []);
app.controller("MainController", function($scope, JwInfos){

  angular.element(document).ready(function(){
    init();
  });

  function init() {
    JwInfos.getSingles(function(singles){
      singles.forEach(function(single){
        $scope.singles.push(single);
        single.jw_created_at = new Date(single.created_at);
        single.jw_stream_url = single.stream_url + "?client_id" + JwInfos.cleintId;
        single.jw_artwork_url = single.artwork_url.replace("large", "original");
      });

      console.log(singles[0]);
    });
  }


  function initScope($scope){
    $scope.singles = [];
  }

  initScope($scope);

});


app.factory("JwInfos", function($http){

  var clientId = "0be8085a39603d77fbf672a62a7929ea";
  var jwTracks = "http://api.soundcloud.com/users/67393202/tracks.json?client_id=" + clientId;
  var jwComments = "http://api.soundcloud.com/tracks/[id]/comments.json?client_id=" + clientId;

  function getSingles(callback){
    var request = $http({
      url: jwTracks,
      method: "GET"
    });

    request.success(function(data, status){
      callback(data);
    });
  };

  function getComments(id, callback){
    var request = $http({
      url: jwComments.replace("[id]", id),
      method: "GET"
    });

    request.success(function(datas, status){
      callback(datas);
    });
  }

  return {
    getSingles : getSingles,
    clientId: clientId,
    getComments: getComments
  };
});
