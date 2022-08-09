import React from 'react';
import FormTile from './FormTile';

function Forms({ forms }) {
  return (
    <div className="flex justify-evenly">
      {forms && forms.length > 1
        ? forms.map((form, idx) => {
            return (
              <FormTile
                key={form.pokemon.name}
                formInfo={form.pokemon}
              />
            );
          })
        : null}
    </div>
  );
}

export default Forms;
