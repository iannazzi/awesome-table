var ColumnDefinition =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demos/data/ColumnDefinition.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demos/data/ColumnDefinition.js":
/*!****************************************!*\
  !*** ./demos/data/ColumnDefinition.js ***!
  \****************************************/
/*! exports provided: ColumnDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColumnDefinition\", function() { return ColumnDefinition; });\nclass ColumnDefinition {\n    //the column definition defines the data, the view and controller functions\n    constructor() {\n\n    }\n\n    allOptions() {\n\n        var cd = [];\n        cd.push(this.row_checkbox());\n        cd.push(this.row_number());\n        cd.push(this.select());\n        cd.push(this.tree_select());\n        cd.push(this.individual_select());\n        cd.push(this.button());\n        cd.push(this.link());\n        cd.push(this.checkbox());\n        cd.push(this.radio());\n        cd.push(this.input());\n        cd.push(this.date());\n        cd.push(this.time());\n        cd.push(this.datetime());\n        cd = cd.concat(this.password());\n        cd.push(this.textarea());\n        cd = cd.concat(this.numbers());\n\n        return cd;\n    }\n\n    purchaseOrder(awesomeTable,  updateQuantity, updateTotal) {\n        var cd = [];\n        cd.push(this.row_checkbox());\n        cd.push(this.row_number());\n        cd.push(this.style());\n        cd = cd.concat(this.sizes(awesomeTable,updateQuantity));\n        cd.push(this.cost(updateTotal));\n        cd.push(this.total());\n        console.log(cd);\n        return cd;\n\n    }\n\n    style(){\n        return {\n            \"db_field\": \"style\",\n            \"type\": \"text\",\n            \"caption\": \"Style\"\n        }\n    }\n    cost(updateTotal) {\n        return {\n            \"db_field\": \"cost\",\n            \"type\": \"number\",\n            \"caption\": \"Cost\",\n            \"events\":{\n                \"change\": updateTotal,\n                \"keyup\": updateTotal,\n                \"click\":updateTotal,\n                }\n        }\n    }\n    total() {\n        return {\n            \"db_field\": \"total\",\n            \"type\": \"text\",\n            \"properties\": [{\"readOnly\": true}],\n            \"caption\": \"Total\",\n            \"total\":2\n        }\n    }\n    sizes(awesomeTable,updateQuantity) {\n        return [{\n            \"db_field\": \"sizes\",\n            \"caption\": [[\"XS\", \"S\", \"M\", \"L\", \"\"], [\"40\", \"42\", \"44\", \"46\", \"\"], [\"1\", \"2\", \"3\", \"4\", \"5\"]],\n            \"array\":true,\n            'min':0,\n            //'max':5,\n            \"type\": \"number\",\n            \"default_value\": '',\n            \"show_on_list\": true,\n            \"show_on_view\": true,\n            \"show_on_edit\": true,\n            \"show_on_create\": true,\n            th_width: '50px',\n            \"td_tags\": \"\",\n            \"class\": \"\",\n            \"events\": {\n                \"keyup\": updateQuantity,\n                \"click\":updateQuantity,\n                \"change\":updateQuantity,\n\n\n                    // function(event){\n                    //\n                    // //we can update the quantity and total when the\n                    // //order quantites change\n                    // //however if the cost changes we need to update again....\n                    //\n                    // let rc = awesomeTable.controller.findElement(event.srcElement);\n                    // let r = rc[0];\n                    // let c = rc[1];\n                    //\n                    //\n                    // let sum = adjustableColumn.model.sumArray('sizes',r);\n                    // //now set a value....\n                    // adjustableColumn.setValue('qty', r, sum);\n                    // //now update the total for the line...\n                    // let cost = adjustableColumn.getValue('cost', r);\n                    // let total = sum*cost;\n                    // adjustableColumn.setValue('total', r, total);\n\n\n\n\n                //}\n            },\n            \"properties\": [],\n            \"word_wrap\": true\n        },\n            {\n                \"db_field\": \"qty\",\n                \"caption\": \"Quantity\",\n                \"type\": \"text\",\n                \"default_value\": '',\n                \"show_on_list\": true,\n                \"show_on_view\": true,\n                \"show_on_edit\": true,\n                \"show_on_create\": true,\n                \"th_width\": '',\n                \"td_tags\": \"\",\n                \"class\": \"\",\n                \"events\": [],\n                \"search\": \"LIKE ANY BETWEEN EXACT\",\n                \"properties\": [{\"readOnly\": true}],\n                \"total\": 0,\n                \"round\": 0,\n                \"word_wrap\": true\n            },];\n    }\n\n    //move these to a data faker class.....\n    select_values() {\n        let s = [\n            {\n                'value': 1,\n                'name': 'liliana'\n            },\n            {\n                'value': 2,\n                'name': 'two'\n            }, {\n                'value': 3,\n                'name': 'three'\n            }, {\n                'value': 4,\n                'name': 'four'\n            }, {\n                'value': 5,\n                'name': 'five'\n            }, {\n                'value': 6,\n                'name': 'six'\n            }, {\n                'value': 7,\n                'name': 'seven'\n            }, {\n                'value': 8,\n                'name': 'eight'\n            }, {\n                'value': 9,\n                'name': 'nine'\n            },\n        ]\n        return s;\n    }\n\n    tree_select_values() {\n        let s = [\n            {\n                \"name\": \"one\",\n                \"value\": \"1\",\n                \"children\": [\n                    {\"name\": \"one_child_one\", \"value\": \"1_1\"},\n                    {\"name\": \"one_child_two\", \"value\": \"1_2\"},\n                ]\n            },\n            {\n                \"name\": \"two\",\n                \"value\": \"2\",\n                \"children\": [\n                    {\n                        \"name\": \"two_child_one\", \"value\": \"2_1\", \"children\": [\n                        {\"name\": \"two_child_one_child_one\", \"value\": \"2_1_1\"},\n                        {\"name\": \"two_child_two_child_two\", \"value\": \"2_1_2\"},\n                    ]\n                    },\n                    {\"name\": \"two_child_two\", \"value\": \"2_2\"}\n                ]\n            }\n\n        ]\n\n        return s;\n    }\n\n    button() {\n        return {\n            \"db_field\": \"button\",\n            \"type\": \"button\",\n            \"button_caption\": \"button\",\n            \"th_width\": 100,\n            \"caption\": \"Button\",\n\n        };\n    }\n\n    link() {\n        return {\n            \"db_field\": \"link\",\n            \"type\": \"link\",\n            \"caption\": \"Link\",\n            \"default_value\": 'link',\n            \"editable\": false,\n            \"search\": true,\n            \"search_default\": \"\",\n\n\n        };\n    }\n\n    checkbox() {\n        return {\n            \"db_field\": \"checkbox\",\n            \"type\": \"checkbox\",\n            \"caption\": \"Checkbox\",\n            \"default_value\": 1,\n            \"search\": true,\n            \"search_default\": \"\",\n\n        };\n    }\n\n    radio() {\n        return {\n            \"db_field\": \"radio\",\n            \"type\": \"radio\",\n            \"caption\": \"Radio\",\n        };\n    }\n\n    input() {\n        return {\n            \"db_field\": \"input\",\n            \"type\": \"text\",\n            \"caption\": \"Text Input\",\n            \"placeholder\": \"\",\n            \"search\": true,\n            \"search_default\": \"\",\n        };\n    }\n\n    date() {\n        return {\n            \"db_field\": \"date\",\n            \"type\": \"date\",\n            \"caption\": \"Date\",\n            \"placeholder\": \"YYYY-MM-DD\",\n            \"search\": true,\n            \"search_default\": \"\",\n\n        };\n    }\n\n    time() {\n        return {\n            \"db_field\": \"time\",\n            \"type\": \"text\",\n            \"caption\": \"Time\",\n            \"placeholder\": \"HH:MM:SS 24 hour or 12 hour with PM\",\n            \"search\": true,\n            \"search_default\": \"\",\n        };\n    }\n\n    datetime() {\n        return {\n            \"db_field\": \"date_time\",\n            \"type\": \"text\",\n            \"caption\": \"Date Time\",\n            \"placeholder\": \"YYYY-MM-DD HH:MM\",\n            \"search\": true,\n            \"search_default\": \"\",\n        };\n    }\n\n    password() {\n        return [{\n            \"db_field\": \"password\",\n            \"type\": \"password\",\n            \"caption\": \"Password\",\n            \"show_on_edit\": false,\n            \"show_on_list\": false,\n            \"show_on_view\": false,\n            \"show_on_create\": true,\n\n\n        }, {\n            \"db_field\": \"password_confirmation\",\n            \"type\": \"password\",\n            \"caption\": \"Password Confirmation\",\n            \"show_on_edit\": false,\n            \"show_on_list\": false,\n            \"show_on_view\": false,\n            \"show_on_create\": true,\n\n        }\n        ]\n\n    }\n\n    textarea() {\n        return {\n            \"db_field\": \"textarea\",\n            \"type\": \"textarea\",\n            \"caption\": \"Textarea\",\n            \"search\": true,\n            \"search_default\": \"\",\n\n        };\n    }\n\n    numbers() {\n        return [{\n            \"db_field\": \"number\",\n            \"type\": \"number\",\n            \"caption\": \"Number\",\n            \"search\": true,\n            \"search_default\": \"\",\n        },\n            {\n                \"db_field\": \"number_round_2\",\n                \"type\": \"number\",\n                \"caption\": \"Number Rounded 2 Places\",\n                \"default_value\": 10,\n                \"round\": 2,\n                \"total\": 2,\n                \"search\": true,\n                \"search_default\": \"\",\n\n            },\n            {\n                \"db_field\": \"number_round_0\",\n                \"type\": \"number\",\n                \"caption\": \"Number Rounded 0 Places\",\n                \"default_value\": 20,\n                \"round\": 0,\n                \"total\": 0,\n                \"search\": true,\n                \"search_default\": \"\",\n\n            }]\n    }\n\n    row_number() {\n        return {\n            \"type\": \"row_number\",\n            \"db_field\": \"row_number\",\n            \"caption\": \"row\",\n        };\n    }\n\n    row_checkbox() {\n\n        return {\n            \"type\": \"row_checkbox\",\n            \"db_field\": \"row_checkbox\",\n        }\n\n    }\n\n    select() {\n\n        return {\n            \"db_field\": \"select\",\n            \"type\": \"select\",\n            \"select_values\": this.select_values(),\n            \"caption\": \"select\",\n            \"default_value\": false,\n            \"search\": true,\n            \"search_default\": \"\",\n\n        };\n\n    }\n\n    tree_select() {\n        let obj = {\n            \"db_field\": \"tree_select\",\n            \"type\": \"tree_select\",\n            \"select_values\": this.tree_select_values(),\n            \"caption\": \"Tree Select\",\n            \"default_value\": 1,\n            \"search\": true,\n            \"search_default\": \"\",\n        }\n        return obj;\n    }\n\n    individual_select() {\n        let obj = {\n            \"db_field\": \"individual_select\",\n            \"type\": \"select\",\n            \"select_values\": this.select_values(),\n            \"individual_select_options\": true,\n            \"caption\": \"Individual Select\",\n            \"search\": true,\n            \"search_default\": \"\",\n\n        };\n        return obj;\n    }\n\n}\n\n\n\n//# sourceURL=webpack://ColumnDefinition/./demos/data/ColumnDefinition.js?");

/***/ })

/******/ });