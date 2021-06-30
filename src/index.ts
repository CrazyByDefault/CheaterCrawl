import { D2API } from './modules/bnet';

const d2 = new D2API('36903', '', 'd582f84d02914b838945d5954c91b4f3', true);
d2.bypassOauthWithToken(
  'CMKmAxKGAgAg7gyDIbn06vY1UPQvYxfe1BiUokgFt9nbcOIEtG/oiC3gAAAAPIXMWdyxEpSMtrJkiUk+cTmjGZ17NHmGz9QKp048w7yKIn92U9hR7oohRTL3WcE13bbjU+aL3vOWChTGdsr6/81+x95aE7rmQGG6k6Y2jlHOKa08y6fJP68f5Pb0zMLSdXUPYzPLNpeyMDyuQ2Xpj1THrV/t+6i+XlwpUNUjQISGOcZb9fBGKzzkS26RV5+wDGSuJ4oCd0YxVRVhGvDzHv8ioGL9mukOuBjHjEHXf2dWVqL4bSc7misxo9sThmzhvFGuJrPhT1wCe1WS0EgX07VtwsjtBlpefzEskqaqV2g='
);

d2.getUserByDisplayName('CrazyByDefault').then(users => {
  console.log(users);

  users.forEach(user => {
    d2.getCharacters(user).then(characters => console.log(characters));
  });
});
