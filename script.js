var recipe = {};

$(window).on("load", () => {
  $.getJSON("recipe.json", (json) => {
      console.log(json);
      recipe = json;
  }).done(() => {
    clearError();
    generateRecipe();
  });
  //;
});

function generateRecipe() {
  var block = generateBlock("");
  if(block !== null) {
    $("#recipe").html(block);
    clearError();
  }
  else {
    showError("Beim generieren trat ein Fehler auf.");
  }
}

function generateBlock(key) {
  if(key in recipe) {
    var error = false;
    // choose a random block out of our recipe
    var block = recipe[key][Math.floor(Math.random() * recipe[key].length)];
    block = block.split(" ");
    // scan all words for vars to replace
    block.forEach((item, index) => {
      if(item.startsWith("$")) {
        // generate a new block to replace the var
        var newBlock = generateBlock(item.substr(1));
        // replace or brake in case of error
        if(newBlock !== null) {
          block[index] = newBlock;
        }
        else {
          error = true;
        }
      }
    });
    // return or break
    if(!error) {
      return block.join(" ");
    }
    else {
      return null;
    }
  }
  else {
    return null;
  }
}

function showError(msg) {
  $("#error").html(msg).fadeIn();
}

function clearError() {
  $("#error").fadeOut().html("");
}
