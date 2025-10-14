// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import * as jquery from "jquery"
import "semantic-ui"
import "controllers"
import "channels"

$(document).on('turbo:load', function() {
    $('.ui.dropdown').dropdown();
    // Prevent duplicate submit handlers when turbo reloads the page
    $(document).off('submit', '.ui.reply.form');
    $(document).on('submit', '.ui.reply.form', function(e) {
        e.preventDefault();
        const form = $(this);
        const url = form.attr('action');
        const body = form.find('input[name="message[body]"]').val();

        if (!body || body.trim() === '') return;

        $.post(url, { message: { body: body }, authenticity_token: $('meta[name=csrf-token]').attr('content') })
            .done(function() {
                form.find('input[name="message[body]"]').val('');
            })
            .fail(function(err) {
                console.error('Message post failed', err);
            });
    });
});

$(document).on('click', '.message .close', function() {
    $(this).closest('.message').transition('fade');
});
