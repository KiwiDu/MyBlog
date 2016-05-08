function init() {
    console.log("beg");
    createTable();
    fillTable();
    activateTable();
    console.log("end");
}

function createTable() {
    var main = newblock("table", "main-t", "bg", 0);
    document.getElementById("main").appendChild(main);
    for (var row = 0; row < 7; row++) {
        main.appendChild(newblock("tr", "tr-" + row.toString(), "tr", row));
        for (var cell = 18 * row; cell < (18 * (row + 1)); cell++) {
            var tcell = newblock("td", "", "element", cell + 1);
            tcell.innerHTML = "&nbsp";

            $("tr-" + row).appendChild(tcell);
        }
    }
}

function fillTable() {
    var elementlist = eval("(" + ajax("GET", "Js/info.json") + ")");
    var location = ajax("GET", "locations.txt");
    var regexp = /[\n\r\f\t]/g;
    location = location.replace(regexp, '');
    //get the location of each element 
    //and delete the blanks & new-lines to make it easier to edit

    var k = 0;//the pointer points to the table cell
    for (var row = 0; row < 7; row++) {
        //row by row
        for (var cell = 18 * row; cell < (18 * (row + 1)); cell++) {
            //var tcell = document.querySelector("td[no =" + "\"" + (cell + 1).toString() + "\"" + "]"); //TOFUNC (DONE)
            var tcell = select("td", "*", "*", "no", "\"" + (cell + 1).toString() + "\"");//select such a cell
            if (elementlist[k]) {//are there such an element?
                if (location[cell] == 'x') {//
                    tcell.style.backgroundColor = "transparent";
                    continue;
                } else {
                    tcell.innerHTML = "<span>" + elementlist[k].name + "</span>" + "<span>" + elementlist[k].chname + "</span>";
                    switch (location[cell]) {
                        case 'n'://non-metal
                            tcell.style.backgroundColor = "#2196F3";
                            break;
                        case 'm'://metal
                            tcell.style.backgroundColor = "#009688";
                            break;
                        case 'p'://transtion metal
                            tcell.style.backgroundColor = "#8BC34A";
                            break;
                        //TODO:MORE SECTIONS
                    }
                    k++;//move to the next table cell;
                }
            } else {
                tcell.style.backgroundColor = "transparent";//empty cell
                continue;
            }
        }
    }
}

function activateTable() {

}//TODO

function newblock(ele, idn, classn, no) {
    var e = document.createElement(ele);
    e.setAttribute("id", idn);
    e.setAttribute("class", classn);
    e.setAttribute("no", no);
    return e;
}

function $(id) {
    return document.getElementById(id);
}

function select(tag, classN, id, attrN, attrV) {
    var selecter = "";
    if (tag == "*") {
        tag = "";
    }
    if (classN == "*") {
        classN = "";
    } else {
        classN = "." + classN;
    }
    if (id == "*") {
        id = "";
    } else {
        id = "#" + id;
    }
    var attr;
    if (attrN == "*") {
        attr = "";
    } else {
        if (attrV == "") {
            attr = "[" + attrN + "]";
        } else {
            attr = "[" + attrN + "=" + attrV + "]";
        }
    }
    selecter = tag + id + classN + attr;
    //console.log(selecter);
    return document.querySelector(selecter);
}

function ajax(method, path, callback) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    if (callback === undefined) {
        xmlhttp.open(method, path, false);
    } else {
        xmlhttp.open(method, path, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback();
            }
        }
    }
    xmlhttp.send();
    console.log(xmlhttp.responseText);
    return xmlhttp.responseText;
}
