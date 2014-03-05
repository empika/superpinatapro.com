(function() {
    
    var canvas = document.getElementById('pinatacanvas');
    
    var world = boxbox.createWorld(canvas, {gravity: {x: 0, y: 9.8}, scale: 100, collisionOutlines: false});
    
    var thisEntity;
    var previousEntity;
    
    var linkTemplate = {
        width: .2,
        height: 0.5,
        image: "/img/rope_1.png",
        imageStretchToFit: true
    };
    
    var x = 6.2;
    
    thisEntity = world.createEntity(linkTemplate, {x: x, y: -1, type: "static", friction: 2, angularDamping: 4});
    
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
        y: y, // - 0.2,
        image: "/img/pinata_idle_huge.png",
        imageOffsetX: -1,
        imageOffsetY: -1,
        density: 5,
        width: 1,
        height: 1,
        imageStretchToFit: false,
        //friction: 0.5,
        angularDamping: 4
    });
        
    world.createJoint(previousEntity, thisEntity, {
        type: "revolute",
        jointPositionOnEntity1: {x:0, y:.05}, 
        jointPositionOnEntity2: {x:.5, y:.05}
    });

    thisEntity.applyImpulse(-50, 40);
    
    var intervalID = window.setInterval(
        function() {
            var random = Number(Math.random());
            var direction = random > 0.5 ? Math.random() * 40 : Math.random() * -40;
            //console.log(direction);
            thisEntity.applyImpulse(-50, direction);
        }
        , 7000
    );

    window.peck = function() {
        thisEntity.applyImpulse(15, 1);
    }
     
})();

