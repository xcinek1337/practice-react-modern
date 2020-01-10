# [![](../assets/img/logo-readme2.jpg)](https://devmentor.pl) &nbsp; React modern #04

> Jeśli chciałbyś więcej tego typu zadań to zapraszam do :heart: [wsparcia mojego konta](https://github.com/sponsors/devmentor-pl)!

&nbsp;

Twoim zdaniem będzie napisanie komponentu `<SpeedTest />` który będzie obliczać szybkość pisania na klawiaturze. Działać ma to w taki sposób, że pokazujemy użytkownikowi wyraz, który ma zostać wpisany do pola formularza. W momencie wpisywania zliczamy czas jaki upłyną, jeśli wyraz został poprawnie wpisany w całości to zapisujemy jego długość oraz wyświetlamy kolejny (pamiętajmy o wyczyszczeniu pola `<input />`).

Komponent ma być napisany w formie funkcyjnej więc będziesz musiał użyć hook-ów do utworzenia logiki działania twojego komponentu.

Zacznij od zapoznania się z plikiem `./hook.js`, który zawiera rozwiązanie, które pozwoli Ci losować podane przez parametr ciągi znaków w formie tablicy np.

```
const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
```

Pierwszy element zwróconej tablicy to zmienna, która przechowuje wylosowany wyraz. Aby wylosować wyraz z podanej tablicy należy wywołać drugi parametr który jest funkcją tj. `regenerateWord()`.

W state (`useState()`) będziemy musieli przechowywać co namniej kilka elementów:

-   tekst wpisywany w `<input />`
-   odliczany czas
-   ilość poprawnie wprowadzonych znaków

Odliczanie czasu będziemy wykonywać w momencie kiedy pole `<input />` jest aktywne oraz zatrzymywać kiedy przestało być aktywne. Oznacza to, że `setInterval()` powinien być uruchamiany w `onFocus`, a czyszczony w momencie `onBlur`. Aby przechowywać identyfikator interwalu użyj referencji tj. `useRef`.

W momencie zamontownaia (`useEffect()`) wygeneruj pierwsze słowo. Za kazdym razem, gdy zostanie wprowadzony jakiś tekst do pola `<input />` (też `useEffect(() => {...}, [text])` ) sprawdzaj czy wprowadzony tekst jest równy wylosowanemu wyrazowi.

&nbsp;

> Jeśli nie posiadasz materiałów do tego zadania to znajdziesz je na stronie :books: [devmentor.pl](https://devmentor.pl)
