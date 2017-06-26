Template.layout.onRendered(function() {
    this.find('#main')._uihooks = {
        insertElement: function(node, next) {
            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn("fast");
        },
        removeElement: function(node) {
            $(node).fadeOut("fast", function() {
                $(this).remove();
            });
        }
    }
});
