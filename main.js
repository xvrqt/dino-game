var spawninterval = 5000;
function pickRandom(lst) {
  return lst[Math.floor(Math.random() * lst.length)];
}

function spawn() {
  setTimeout(spawn, spawninterval);
  var thing = document.createElement("img");
  thing.draggable = false;
  thing.onclick = () => {
    goTo(player, thing);
  };

  const spawnables = [
    { src: "minis/strawberry-fruit-015.gif", id: "strawb" },
    { src: "minis/cherry-fruit-007.gif", id: "cherry" },
    { src: "minis/monitor-screen-0002.gif", id: "compy" },
    { src: "minis/drink-alcohol-0589.gif", id: "bev" },
    { src: "minis/musical-instrument-0052.gif", id: "drum" },
    { src: "minis/jar-green-glass.gif", id: "potion" },
    { src: "minis/musical-instrument-0028.gif", id: "piano" },
    { src: "minis/burger-food-0591.gif", id: "burgy" },
    { src: "minis/food-pudding-0930.gif", id: "flan" },
    { src: "minis/tiger-0077.gif", id: "tiger" },
  ];

  chosenToSpawn = pickRandom(spawnables);

  thing.src = chosenToSpawn.src;
  thing.id = chosenToSpawn.id;

  var r = 50 * Math.sqrt(Math.random());
  var theta = Math.random() * 2 * Math.PI;
  var x = 50 + r * Math.cos(theta);
  var y = 50 + r * Math.sin(theta);
  thing.style.top = y + "%";
  thing.style.left = x + "%";
  world.append(thing);
}
spawn();

function awaken() {
  player.src = walkGif;
}
function stand() {
  player.src = standGif;
}
function setPlayerTransform() {
  player.style.transform =
    "scaleX(" +
    (player.classList.contains("flipped") ? -scale : scale) +
    ") scaleY(" +
    scale +
    ")";
}
function setText(txt) {
  text.style.top = player.style.top;
  text.style.left = player.style.left;
  text.innerHTML = txt;
  setTimeout(() => {
    text.innerHTML = "";
  }, 2000);
}
function goTo(who, place) {
  awaken();

  distanceTop =
    parseInt(who.style.top.replace("%", "")) -
    parseInt(place.style.top.replace("%", ""));

  distanceLeft =
    parseInt(who.style.left.replace("%", "")) -
    parseInt(place.style.left.replace("%", ""));

  if (distanceLeft > 0) player.classList.add("flipped");
  else player.classList.remove("flipped");

  setPlayerTransform();

  timeToGetThere =
    Math.sqrt(distanceTop * distanceTop + distanceLeft * distanceLeft) / 20;

  if (timeToGetThere == 0) timeToGetThere = 1;

  player.style.transition =
    "top " +
    timeToGetThere +
    "s linear, " +
    "left " +
    timeToGetThere +
    "s linear";

  who.style.top = place.style.top;
  who.style.left = place.style.left;

  if (goTimeout !== "undefined") clearTimeout(goTimeout);

  var actions = {
    bev: (bev) => {
      /*player.classList.add("drunk");*/
      setText("Cheers");
      bev.style.display = "none";
      new Audio("audio/LlMjVNmSPSVUn8q2jmsa7FRyRfbZPpjf").play();
    },
    cherry: (cherry) => {
      player.classList.add("color-red");
      setText("Yum");
      cherry.style.display = "none";
      scale += 0.4;
      var audio = new Audio(
        pickRandom([
          "audio/b2X2quPvpWkfPhrR148D1AVt3fdxm8kg",
          "audio/3dyW4B4yVJ9pZJPWdpWsXQJZV9Rka8v9",
        ]),
      );
      audio.play();
    },
    burgy: (burgy) => {
      setText("Burgy");
      burgy.style.display = "none";
      scale += 0.8;
      new Audio("audio/TZMJUGaWnKO0JNYqojPweQRAnAIhwNQT").play();
    },
    flan: (flan) => {
      setText("Flan!");
      flan.style.display = "none";
      scale += 0.3;
      new Audio("audio/7uTWsWCTuUN4Ebb6Ej3F5BYvPVpyn3TU").play();
    },
    tiger: (tiger) => {
      setText("HISS");
      goTo(document.getElementById("player"), document.getElementById("water"));
      new Audio("audio/Qlx959rTWcV3XC88OLohfSx2mV2aQFKz").play();
    },
    potion: (potion) => {
      player.classList.add("color-green");
      setText("Glug");
      scale = 1;
      potion.style.display = "none";
      new Audio("audio/xtqr6V1L8PejI95CgKubaD3IVYn8awCp").play();
    },
    strawb: (place) => {
      player.classList.add("color-red");
      setText("Straw B!");
      scale += 0.4;
      place.style.display = "none";
      var audio = new Audio("audio/LzXVSLD6v6LtWms6NqxFWNUWDC27xApl");
      audio.play();
    },
    drum: (drum) => {
      setText("so dumb");
      inventory.append(drum);
      drum.style.position = "static";
      new Audio("audio/5F96ZysDhefdrxHggAtZdrjFHKHtJpFT").play();
    },
    piano: (piano) => {
      setText("sinf!");
      inventory.append(piano);
      piano.style.position = "static";
      new Audio("audio/pNmrFxGLBSXDpto7EPiykFS25wdVz4AE").play();
    },
    compy: (compy) => {
      setText("compy!");
      inventory.append(compy);
      compy.style.position = "static";
      new Audio("audio/UXUdWfVNa4X25intQUjB9IubInVvIl4O").play();
    },
    fire: (fire) => {
      setText("OH NO");
      var audio = new Audio("audio/LxfwggLqDnT6aM5T2VURxzJNALYnWH3I");
      audio.play();
      player.classList.add("burnt");
    },
    water: (water) => {
      if (player.classList.contains("burnt")) {
        setText("Clean!");
        player.classList.remove("burnt");
        new Audio("audio/gxEHSSGuWRZJb1P9J1JExoaxEXBHhAor").play();
      } else {
        new Audio("audio/mIExYUEQigBfyRiuJkkPxFfBWf2CESdf").play();
      }
    },
  };
  if (scale > 3) world.classList.add("shaking");

  goTimeout = setTimeout(() => {
    console.log(spawninterval);
    if (spawninterval > 1000) spawninterval -= 100;
    if (spawninterval > 100) spawninterval -= 10;
    world.classList.remove("shaking");
    actions[place.id](place);
    player.style.transform =
      "scaleX(" +
      (player.classList.contains("flipped") ? -scale : scale) +
      ") scaleY(" +
      scale +
      ")";
    stand();
  }, timeToGetThere * 1000);
}
