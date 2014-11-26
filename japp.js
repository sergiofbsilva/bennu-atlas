graph = new joint.dia.Graph;

paper = new joint.dia.Paper({
    width: 900,
    height: 900,
    model: graph,
    interactive : false

});

var paperScroller = new joint.ui.PaperScroller({
    paper: paper,
    padding: 50
});

$('#canvas').append(paperScroller.render().el);

paper.on('blank:pointerdown', paperScroller.startPanning);

$('#btn-center').on('click', _.bind(paperScroller.center, paperScroller));
$('#btn-center-content').on('click', _.bind(paperScroller.centerContent, paperScroller));

$('#btn-zoomin').on('click', function() {
    paperScroller.zoom(0.2, { max: 2 });
});

$('#btn-zoomout').on('click', function() {
    paperScroller.zoom(-0.2, { min: 0.2 });
});
$('#btn-zoomtofit').on('click', function() {
    paperScroller.zoomToFit({
        minScale: 0.2,
        maxScale: 2
    });
});

uml = joint.shapes.uml;