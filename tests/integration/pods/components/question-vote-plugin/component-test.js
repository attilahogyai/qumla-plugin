import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('question-vote-plugin', 'Integration | Component | question vote plugin', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{question-vote-plugin}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#question-vote-plugin}}
      template block text
    {{/question-vote-plugin}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
