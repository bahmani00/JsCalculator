//var ABC = ABC || {};

//Pattern for creating an object in js
var ABC = (function (ABC) {

    return ABC;
}(ABC || {}));


var ABC = (function (ABC) {

    var TabStrip = function (tabStripEl) {
        var tabElements = $(tabStripEl).children(".tab-item");
        var tabPagesElements = $(tabStripEl).children(".tabcontainer");

        var tabs = creatTabs(this, tabElements, tabPagesElements);

        //this.selectedTab = null;
        //this.selectedTabIndex = -1;

        Object.defineProperties(this, {
            id:{
                value: tabStripEl.id,
                enumerable: true
            },
            selectedTab: {
                value: null,
                writable : true,
                enumerable: true
            },
            selectedTabIndex: {
                value: -1,
                writable : true,
                enumerable: true
            },
            el: {
                value: tabStripEl,
                enumerable: true
            },
            tabs: {
                value: tabs,
                enumerable: true
            }
        });
    };

    Object.defineProperties(TabStrip.prototype, {
        addTab: {
            value: function (options) {
                var index = this.tabs.length + 1;

                var newTabEl = document.createElement('SPAN');
                newTabEl.className = "tab-item";
                newTabEl.innerText = "tab " + index;

                if (this.tabs.length > 0) {
                    var lastTabEl = this.tabs[this.tabs.length - 1].el;
                    lastTabEl.parentNode.insertBefore(newTabEl, lastTabEl.nextSibling);
                } else {
                    this.el.appendChild(newTabEl);
                }

                var newTabPageEl = document.createElement('DIV');
                newTabPageEl.className = "tabcontainer";
                newTabPageEl.innerHTML = "<h2>content of tab page: " + index + "</h2>";
                newTabPageEl.classList.add("hide");

                this.el.appendChild(newTabPageEl);

                var tab = new Tab(this, newTabEl, newTabPageEl, index - 1);

                this.tabs.push(tab);

                if (this.tabs.length == 1) tab.selected = true;

            },
            enumerable: true
        },
        removeTab: {
            value: function (index) {
                if (index < 0 || index > this.tabs.length) {
                    throw new Error("Index is out of range!!!!");
                }

                var tab = this.tabs[index];

                var lastTabEl = tab.el;
                var lastTabPageEl = tab.tabPage.el;

                this.tabs.splice(index, 1);

                this.el.removeChild(lastTabEl);
                this.el.removeChild(lastTabPageEl);

                tab = null;
            },
            enumerable: true
        },
        appendTo: {
            value: function (parentEl) {
                parentEl.appendChild(this.el);
            },
            enumerable: true
        }
    });

    ABC.createTabStrip = function (tabStripId) {
        var tabStripEl = document.getElementById(tabStripId);
        if (!tabStripEl) {
            tabStripEl = document.createElement('DIV');
            tabStripEl.id = tabStripId;
            tabStripEl.className = "tabstrinp";
        }

        return new TabStrip(tabStripEl);
    };

    function creatTabs(tabStrip, tabElements, tabPagesElements) {

        var tabs = [];

        [].forEach.call(tabElements, function (tabEl, index, array) {

            var tab = new Tab(tabStrip, tabEl, tabPagesElements[index], index);

            tabs.push(tab);
        });

        return tabs;
    };

    var Tab = function (tabStrip, tabEl, tabPageEl, index) {

        //this.tabPage = new TabPage(tabPageEl, tab, index);

        Object.defineProperties(this,
            {
                //click: {
                //    value : tabEl.click.call
                //},
                id: {
                    value: "tab" + index
                },
                tabStrip: {
                    value: tabStrip
                },
                el: {
                    value: tabEl
                },
                index: {
                    value: index
                },
                tabPage: {
                    value: new TabPage(tabPageEl, tab, index)
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
                                tabStrip.selectedTab = tab;
                                tabStrip.selectedTabIndex = tab.index;

                                tabEl.classList.add("selected");
                                tabPageEl.classList.remove("hide");
                            } else {
                                tabStrip.selectedTab = null;
                                tabStrip.selectedTabIndex = -1;

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

        var tab = this;

        $(tabEl).click(function () {
            tab.selected = true;
        });
    };


    var TabPage = function (tabPageElement, tab, index) {

        Object.defineProperties(this, {
            id: {
                value: "tabPage" + index
            },
            el: {
                value: tabPageElement
            },
            tab: {
                value: tab
            },
            index: {
                value: index
            }
        });
    };

    function deselectTabs(tabs, visible) {
        [].forEach.call(tabs, function (tab, index, array) {
            tab.el.classList.remove("selected");
        });
    };
    function hideTabPages(tabs, visible) {
        [].forEach.call(tabs, function (tab, index, array) {
            if (visible)
                tab.tabPage.el.classList.remove("hide");
            else
                tab.tabPage.el.classList.add("hide");
        });
    };

    return ABC;
}(ABC || {}));

var selectedTabIndex = 1;
var tabStrip = ABC.createTabStrip('myTabStrip');
//tabStrip.tabs[selectedTabIndex].selected = true;

function addTab(sender) {
    tabStrip.addTab();
}
function removeTab(sender) {
    var index = tabStrip.tabs.length - 1;
    tabStrip.removeTab(index);
}

var Person = function (fname) {
    this.name = fname;
}
var Employee = function (fname, position) {
    Person.call(this, fname);

    this.position = position;
}
