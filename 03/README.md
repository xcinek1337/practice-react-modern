> :star: *Jeśli będziesz mieć problem z rozwiązaniem tego zadania, poproś o pomoc na odpowiednim kanale na Slacku, tj. `s2e04-react-modern` (dotyczy [mentee](https://devmentor.pl/mentoring-javascript/)). Pamiętaj, aby treść Twojego wpisu spełniała [odpowiednie kryteria](https://devmentor.pl/jak-prosic-o-pomoc/).*
> 
&nbsp;

# `#03` React: Nowoczesny


Tym razem znajdziesz w pliku `./context.js` utworzone dwa konteksty. Jeden dotyczy tekstu, drugi koloru.

Obie wartości masz wykorzystać w komponencie `<Div>` jako tytułu dla `<h1>` oraz kolor obramowania dla `<div>`.

Jednak musisz zrobić to w taki sposób, aby wartości domyślne były zaczytane przy zagnieżdzonym elemencie w `<Box>`. Natomiast dla komponentu `<Div>`, który jest renderowany przy `<Box>` (jako rodzeństwo) została nastawiona treść dla `TextContext` na `sibling`.

Efekt końcowy:
```
<section>
    <Box /> // => <div style="border: 1px solid red"><h1>nested</h1> ... </div>
    <Div /> // => <div style="border: 1px solid red"><h1>sibling</h1> ...</div>
</section>
```
&nbsp;

> :arrow_left: [*poprzednie zadanie*](./../02) | [*następne zadanie*](./../04) :arrow_right:
