$('#main_menu_toggle').click(function() {
    $('.main_sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('toggle');

});

$('#main_menu_toggle').click(function() {
    $('.edtitor_sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('toggle');

});


var toolbarOptions = [
    ['bold', 'italic', 'underline', 'video', 'formula', { 'header': 1 }, { 'header': 2 }, { 'color': [] }, { 'background': [] }, 'link'], // toggled buttons

];

var optionsForEidtor = {
    theme: 'snow',
    placeholder: 'Write a note...',
    modules: {
        'toolbar': toolbarOptions,
    }
};

<!-- Initialize Quill editor -->
var editor = new Quill('#editor', optionsForEidtor);
var editor_mod = new Quill('#editor-modal', optionsForEidtor);

$(".ql-toolbar").append("<a href='#' class='own-checkmark' data-tooltip='Done' data-position='bottom right' data-variation='mini'><i class='circular checkmark icon link own-class-checkmark' ></i></a>");

$('.ui.dropdown')
    .dropdown();


$('.own-card-resize-full').click(function() {
    $('.coupled.modal')
        .modal({
            allowMultiple: false
        });
    $('.own-edit-modal')
        .modal('attach events', '.own-expand-modal .own-edit-button-modal');
    // show first now
    $('.own-expand-modal')
        .modal('show');
});


/*$('.add.note').click(function() {
    var moduleName = 'quilljs-renderer/index.js';
    require([moduleName], function(renderer) {
        var Document = renderer.Document;
        // Load the built-in HTML formatter 
        renderer.loadFormat('html');
        var contentOfTE = new Document(quill.getContents());
        $('#note_test').html(contentOfTE.convertTo('html'));
    });

});

$('.edit.note').click(function() {
    if ($('.ql-toolbar').css('visibility') == 'hidden') {
        $('.ql-toolbar').animate({ opacity: 1 }, '1000', function() {
            $('.ql-toolbar').css('visibility', 'visible');
        });
    } else {
        $('.ql-toolbar').animate({ opacity: 0 }, '1000', function() {
            $('.ql-toolbar').css('visibility', 'hidden');
        });

    }

});*/
