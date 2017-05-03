/**
 * Created by Dawid on 03.05.2017.
 */
var countForm = $("#submitCount");
var nodesForm = $("#nodes");
var count = 0;
var guardian = 0;
var graph;

countForm.submit(function(event) {
    event.preventDefault();
    count = $('#count').val();
    nodesForm.empty();

    if(count > 0) {
        guardian = 0;
        generateInputNodes(count);
    }
});


function generateInputNodes(nodesNumber) {
    for(let i = 0; i < nodesNumber; i++) {
        nodesForm.append("<label for='node" + i + "'>Node " + i + "</label> <input type='text' id='node " + i + "'/>" )
    }
    nodesForm.append("<button type='submit' class='checkBtn' id='submitNodes'>Check graph</button>")
}

nodesForm.submit(function(event) {
    event.preventDefault();
    graph = new Graph(count);
    let nodes = $(this).find("input[type='text']");
    $(nodes).each(function() {
        if(($(this).val() < 0 || $(this).val() >= count || $(this).val() == '') && !($(this).hasClass('errorBorder'))) {
            $(this).addClass('errorBorder');
            $(this).after("<p class='error'>Niepoprawna wartość</p>")
            guardian += 1;
        }
        else if($(this).val() >= 0 && $(this).val() < count && $(this).val() != '' && $(this).hasClass('errorBorder')) {
            $(this).removeClass('errorBorder')
            $(this).next().remove();
            guardian -= 1;
        }
    })

    if(guardian == 0) {
        nodes.each(function(index) {
            var adjacencyNodes = $(this).val().replace(" ", "").split(",");
            for(let i = 0; i < adjacencyNodes.length; i++) {
                graph.setAdjacency(parseInt(index), parseInt(adjacencyNodes[i]), true)
            }
        })

        if(graph.isEulerGraph()) {
            alert("Graf jest eulerowski")
        }
        else {
            alert("Graf nie jest eulerowski")
        }
    }
});
