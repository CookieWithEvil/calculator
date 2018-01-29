var hstr = ""; //whole string(history or operations)
var nstr = ""; //current number
var numsAndOpers = [];

function allClear() {
  hstr = "";
  nstr = "";
  numsAndOpers = [];
  $("#main-line").html("0");
  $("#small-line").html(hstr);
}

function clearElement() {
  if (numsAndOpers.length === 0) allClear();
  hstr = hstr.substr(
    0,
    hstr.length - numsAndOpers[numsAndOpers.length - 1].length
  );
  $("#small-line").html(hstr);
}

function writeNum(val) {
  var etc = ""; //if hstr > max value, etc would be "..." at the beginnig of line
  if (nstr.length < 16) {
    nstr += val;
    if (hstr.length > 33) etc = "...";

    $("#small-line").html(etc + hstr.substr(-29));
    $("#main-line").html(nstr);
  }
}

function operation(op) {
  var etc = ""; //if hstr > max value, etc would be "..." at the beginnig of line
  
  if (numsAndOpers[numsAndOpers.length - 1] === "=") {
    nstr = numsAndOpers[0];
    numsAndOpers = [nstr];
    hstr = "";
  } else {
    numsAndOpers.push(nstr);
  }
  //so that operat. symbols won't dublicate:
  if (nstr === "") return;

  hstr += nstr;
  nstr = "";
  if (hstr.length > 33) etc = "...";
  //
  if (numsAndOpers.length >= 3 || op === "=") {
    $("#main-line").html(calc());
  }

  numsAndOpers.push(op);
  hstr += op;

  $("#small-line").html(etc + hstr.substr(-29));
}

function calc() {
  var res = 0;
  switch (numsAndOpers[1]) {
    case "x":
      res = +numsAndOpers[0] * +numsAndOpers[2];
      break;
    case "/":
      res = +numsAndOpers[0] / +numsAndOpers[2];
      break;
    case "+":
      res = +numsAndOpers[0] + +numsAndOpers[2];
      break;
    case "-":
      res = +numsAndOpers[0] - +numsAndOpers[2];
      break;
    default:
      res = numsAndOpers[0];
      break;
  }
  res += "";
  if (res.length > 16) {
    res = "Max num of digits";
  }
  numsAndOpers = [res];

  return numsAndOpers;
}