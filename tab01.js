//var JMS = JMS || {};

//Pattern for creating an object in js
var JMS = (function (JMS) {

    return JMS;
}(JMS || {}));


var JMS = (function (JMS) {

    JMS.createTabStrip = function (tabStripId) {
        var tabStripElement = document.getElementById(tabStripId);
        if (!tabStripElement) {
            tabStripElement = document.createElement('DIV');
            tabStripElement.id = tabStripId;
            tabStripElement.className = "tabstrinp";
        }

        var tabElements = $(tabStripElement).children(".tab-item");
        var tabPagesElements = $(tabStripElement).children(".tabcontainer");

        var tabStrip = {
            id: tabStripId,
            selectedTab : null,
            selectedTabIndex: null,
            addTab: function (options) {
                var index = tabPagesElements.length + 1;

                var newTabEl = document.createElement('SPAN');
                newTabEl.className = "tab-item";
                newTabEl.innerText = "tab " + index;

                if (this.tabs.length > 0) {
                    var lastTabEl = this.tabs[this.tabs.length - 1].el;
                    lastTabEl.parentNode.insertBefore(newTabEl, lastTabEl.nextSibling);
                } else {
                    this.el.appendChild(newTabEl);
                }
                tabElements.push(newTabEl);

                var newTabPageEl = document.createElement('DIV');
                newTabPageEl.className = "tabcontainer";
                newTabPageEl.innerHTML = "<h2>content of tab page: " + index + "</h2>";
                newTabPageEl.classList.add("hide");

                this.el.appendChild(newTabPageEl);
                tabPagesElements.push(newTabPageEl);

                var tab = creatTab(this, newTabEl, newTabPageEl, index - 1);
                
                this.tabs.push(tab);

                if (this.tabs.length == 1) tab.selected = true;

            },
            removeTab: function (index) {
                if (index < 0 || index > this.tabs.length) {
                    throw new Error("Index is out of range!!!!");
                    //return;
                }

                var tab = this.tabs[index];

                var lastTabEl = tab.el;
                var lastTabPageEl = tab.tabPage.el;

                this.tabs.splice(index, 1);
                tabPagesElements.splice(index, 1);

                //console.log("lastTabEl: " + lastTabEl.innerText);
                //console.log("lastTabPageEl: " + lastTabPageEl.innerText);
                this.el.removeChild(lastTabEl);
                this.el.removeChild(lastTabPageEl);

                tab = null;
            },
            appendTo: function (parenrEl) {
                parenrEl.appendChild(this.el);
            }
        };

        var tabs = creatTabs(tabStrip, tabElements, tabPagesElements);

        Object.defineProperties(tabStrip, {
            el: {
                value: tabStripElement
            },
            tabs: {
                value: tabs,
                enumerable: true
            }
        });

        return tabStrip;
    };

    function creatTabs(tabStrip, tabElements, tabPagesElements) {

        var tabs = [];

        [].forEach.call(tabElements, function (tabEl, index, array) {

            var tab = creatTab(tabStrip, tabEl, tabPagesElements[index], index);

            tabs.push(tab);
        });

        return tabs;
    }
    function creatTab(tabStrip, tabEl, tabPageEl, index) {

        var tab =
            {
                id: "tab" + index,
                tabStrip: tabStrip,
                //click: function () { tabEl.click; }
            };

        Object.defineProperties(tab,
            {
                el: {
                    value: tabEl
                },
                tabPage: {
                    value: creatTabPage(tabPageEl, tab, index)
                },
                selected:
                    {
                        get: function () {
                            return tabEl.classList.contains("selected");
                        },
                        set: function (value) {

                            deselectTabs(this.tabStrip.tabs);
                            hideTabPages(this.tabStrip.tabs);

                            if (value) {
                                tabEl.classList.add("selected");

                                tabPageEl.classList.remove("hide");
                            } else {
                                tabEl.classList.remove("selected");
                            }
                        }
                    },
                enabled:
                    {
                        get: function () {
                            return !tabEl.classList.contains("disabled");
                        },
                        set: function (value) {
                            if (value) {
                                tabEl.classList.remove("disabled");
                            } else {
                                tabEl.classList.add("disabled");
                            }
                        }
                    },

            });

        $(tabEl).click(function () {
            tab.selected = true;
            tab.tabStrip.selectedTab = tab;
            tab.tabStrip.selectedTabIndex = tab.index;
        });

        return tab;
    }


    function creatTabPage(tabPageElement, tab, index) {

        var tabPage =
            {
                id: "tabPage" + index,
                el: tabPageElement,
                tab: tab,
                index: index
            };

        return tabPage;
    }

    function deselectTabs(tabs, visible) {
        [].forEach.call(tabs, function (tab, index, array) {
            tab.el.classList.remove("selected");
        });
    }
    function hideTabPages(tabs, visible) {
        [].forEach.call(tabs, function (tab, index, array) {
            if (visible)
                tab.tabPage.el.classList.remove("hide");
            else
                tab.tabPage.el.classList.add("hide");
        });
    }

    return JMS;
}(JMS || {}));

var selectedTabIndex = 1;
var tabStrip = JMS.createTabStrip('myTabStrip');
//tabStrip.tabs[selectedTabIndex].selected = true;

function addTab(sender) {
    tabStrip.addTab();
}
function removeTab(sender) {
    var index = tabStrip.tabs.length - 1;
    tabStrip.removeTab(index);
}

function createMyFunction(myOperator) {
    return new Function("a", "b", "return a" + myOperator + "b;");
    //return function (a, b) {
        //return "return a" + myOperator + "b";
        //return a + b;

    //};
}

var add = createMyFunction("+");                // creates "add" function
var subtract = createMyFunction("-");           // creates "subtract" function
var multiply = createMyFunction("*");           // created "multiply" function

// test the functions
//alert("result of add=" + add(10, 2));            // result is 12
//alert("result of substract=" + subtract(10, 2)); // result is 8
//alert("result of multiply=" + multiply(10, 2));  // result is 20
alert(add);