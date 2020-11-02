<template>
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>Klucz jawny</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Tekst jawny jest wymagany i powinien zawierać znaki, które zawiera alfabet. Jeśli wystepują w nim znaki, których nie zawiera alfabet, są one pomijane.</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Alfabet</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Aflabet jest wymagany. Musi on zawierać unikatowe znaki, które składają się na macierz N x N. Dla każego znaku przypisywana jest jego pozycja w macierzy.</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Klucz</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Klucz jest wymagany. Musi składać się ze znaków występujących w alfabecie. Do każdego znaku klucza przypisywana jest pozycja z alfabetu.</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Szyfrowanie</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Każdy znak tekstu jawnego jest przepisywany do tabeli, która zawiera tyle samo kolumn ile znaków zawiera klucz. Każdy przepisany znak z tekstu jawnego otrzymuje wartość wyliczana na podstawie sumy pozycji znaku w alfabecie i pozycji znaku klucza w danej kolumnie.</p>
        <p>Jeżeli wartość jest większa od 100, od wartości jest odejmowana liczba 100.</p>
        <p>Dla macierzy większych niż 5x5 zastosowano kodowanie 3 cyfrowe, co jest rozszerzeniem metody szyfrowania Nihilistów.</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'HelpPanels',
};
</script>
