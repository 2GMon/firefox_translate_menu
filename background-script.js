browser.menus.create(
  {
    id: "en-ja-search",
    title: "選択したテキストをWeb辞書で検索",
    contexts: ["selection"]
  }
)

browser.menus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "en-ja-search":
      var dictionary = [
        "https://eow.alc.co.jp/search?q=__TEXT__",
        "https://ejje.weblio.jp/content/__TEXT__",
        "https://translate.google.com/#view=home&op=translate&sl=en&tl=ja&text=__TEXT__",
      ];

      dictionary.forEach(function (url) {
        var creating = browser.tabs.create({
          url: url.replace(/__TEXT__/, info.selectionText),
          active: false
        });
        creating.then(onCreated, onError);
      });
      break;
  }
})

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`)
}

function onError(error) {
  console.log(`Error: ${error}`);
}
