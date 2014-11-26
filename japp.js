graph = new joint.dia.Graph;

paper = new joint.dia.Paper({
	el:$('#canvas'),
    width: 2000,
    height: 2000,
    gridSize: 1,
    model: graph
});

// var paperScroller = new joint.ui.PaperScroller({
//     paper: paper
// });

//$('#canvas').append(paperScroller.render().el);

//paper.on('blank:pointerdown', paperScroller.startPanning);

uml = joint.shapes.uml;