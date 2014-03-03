(function() {
    
    var canvas = document.getElementById('pinatacanvas');
    
    var world = boxbox.createWorld(canvas, {gravity: {x: 0, y: 9}, scale: 100});
    
    var thisEntity;
    var previousEntity;
    
    var linkTemplate = {
        width: .2,
        height: 0.5,
        image: "/img/rope_1.png",
        imageStretchToFit: true
    };
    
    var x = 4.2;
    
    thisEntity = world.createEntity(linkTemplate, {x: x, y: -1, type: "static", friction: 2});
    
    var y;
    for (y = 0; y < 4; y = y + 0.5) {
    
        previousEntity = thisEntity;
        thisEntity = world.createEntity(linkTemplate, {x: x, y: y});
        
        world.createJoint(previousEntity, thisEntity, {
            type: "revolute",
            jointPositionOnEntity1: {x:0, y:.05},
            jointPositionOnEntity2: {x:0, y:.05}
        });
    
    }
    
    previousEntity = thisEntity;
    thisEntity = world.createEntity({
        x: x,
        y: y,
        image: "/img/pinata_idle_big.png",
        imageOffsetX: 0, //-0.5,
        imageOffsetY: 0, //-0.6,
        density: 2,
        width: 1,
        height: 1,
        imageStretchToFit: true
    });
        
    world.createJoint(previousEntity, thisEntity, {
        type: "revolute"
    });
    
    var intervalID = window.setInterval(
        function() {
            thisEntity.applyImpulse(50, 10) //Number(Math.random() * 90));
        }
        , 5000
    );
     
})();

