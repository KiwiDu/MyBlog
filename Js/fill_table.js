function init() {
    console.log("beg");
    createTable();
    fillTable();
    activateTable
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
    //var location = "nxxxxxxxxxxxxxxxxnmmxxxxxxxxxxnnnnnnmmxxxxxxxxxxmnnnnnmmppppppppppmmnnnnmmppppppppppmmmnnnmmppppppppppmmmmnnmmppppppppppxxxxxx";
    var location = ajax("GET", "locations.txt");
    var regexp = /[\n\r\f\t]/g;
    location = location.replace(regexp, '');

    var k = 0;
    for (var row = 0; row < 7; row++) {
        //var trow = document.getElementById("tr-" + row.toString());

        for (var cell = 18 * row; cell < (18 * (row + 1)); cell++) {
            //var tcell = document.querySelector("td[no =" + "\"" + (cell + 1).toString() + "\"" + "]"); //TOFUNC
            var tcell = select("td", "*", "*", "no", "\"" + (cell + 1).toString() + "\"");
            //console.log("td[no =" + "\"" + (cell + 1).toString() + "\"" + "]");
            if (elementlist[k]) {
                if (location[cell] == 'x') {
                    tcell.style.backgroundColor = "transparent";
                    continue;
                } else {
                    tcell.innerHTML = "<span>" + elementlist[k].name + "</span>" + "<span>" + elementlist[k].chname + "</span>";
                    switch (location[cell]) {
                        case 'n':
                            tcell.style.backgroundColor = "#2196F3";
                            break;
                        case 'm':
                            tcell.style.backgroundColor = "#009688";
                            break;
                        case 'p':
                            tcell.style.backgroundColor = "#8BC34A";
                            break;
                    }
                    k++;
                }
            } else {
                tcell.style.backgroundColor = "transparent";
                continue;
            }
        }
    }
}

function activateTable() {

}

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
