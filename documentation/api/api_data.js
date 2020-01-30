define({ "api": [
  {
    "type": "get",
    "url": "/api/heartbeat",
    "title": "Maintain Session",
    "name": "HEARTBEAT",
    "group": "Authentication",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted\n{\n    \"message\": \"Accepted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login",
    "name": "LOGIN",
    "group": "Authentication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>Application version</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "company_code",
            "description": "<p>Company code</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "LoginFailed_10001",
            "description": "<p>Login failed</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ApplicationError_10002",
            "description": "<p>Wrong app version</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10003",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10013",
            "description": "<p>Updata time failed</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "LoginFailed_10014",
            "description": "<p>Account locked</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "LoginFailed_10028",
            "description": "<p>Password expired</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "LoginFailed_10029",
            "description": "<p>First time login</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "LoginFailed_10031",
            "description": "<p>Inactive account</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\",\n    \"data\": \"userA\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/api/logout",
    "title": "Logout",
    "name": "LOGOUT",
    "group": "Authentication",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/api/loginbanner/:comp/:lang",
    "title": "Pre-Login Prompt",
    "name": "PRELOGIN___BANNER",
    "group": "Authentication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comp",
            "description": "<p>Company code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"en\"",
              "\"zh-cn\"",
              "\"zh-tw\""
            ],
            "optional": false,
            "field": "lang",
            "description": "<p>Language</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Prompt message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": \"The computing resources that you are going to access...\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10003",
            "description": "<p>MySql error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/api/hasSession/:company_code/:path",
    "title": "Check Session",
    "name": "SESSION___CHECK_COMPANY",
    "group": "Authentication",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>User session data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.company_name",
            "description": "<p>Company name (user belong)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department name (user belong)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fullname",
            "description": "<p>User fullname</p>"
          },
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data.func_code",
            "description": "<p>User specify function code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lang",
            "description": "<p>User specify language</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.map",
            "description": "<p>User specify map</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ou_id",
            "description": "<p>Department id (user belong)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.pwdSetting",
            "description": "<p>Company specify password setting (user belong)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pwdSetting.char",
            "description": "<p>Password minimum length</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pwdSetting.type",
            "description": "<p>Password minimum charater type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.timezone",
            "description": "<p>Company specify timezone (user belong)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"company_name\": \"GreenSafety Company (Demo)\",\n        \"department\": \"Root\",\n        \"fullname\": \"Zilvia Kam\",\n        \"func_code\": [\"COMPANY_PROFILE\", \"DEVICE_MAINT\", \"DRIVER_GRP_MAINT\", \"DRIVER_GRP_PROFILE\", \"DRIVER_MAINT\"],\n        \"lang\": \"en\",\n        \"map\": \"googleMap\",\n        \"ou_id\": \"5\",\n        \"pwdSetting\": {\n            \"char\": \"6\",\n            \"type\": \"1\"\n        },\n        \"timezone\": \"+8:00\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidSession_10005",
            "description": "<p>Unauthorized</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/deviceSet",
    "title": "Add Device",
    "name": "DEVICE___ADD_DEVICE",
    "group": "DeviceSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "md_sn",
            "description": "<p>Device SN</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vrm_id",
            "description": "<p>Vehicle id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "allowedValues": [
              "\"A\"",
              "\"I\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Device status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10303",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10304",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10309",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10310",
            "description": "<p>Binded vehicle</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10311",
            "description": "<p>Vehicle not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10317",
            "description": "<p>Add API error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Device Maintenance"
  },
  {
    "type": "delete",
    "url": "/api/deviceSet",
    "title": "Delete Device",
    "name": "DEVICE___DELETE_DEVICE",
    "group": "DeviceSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "md_sn",
            "description": "<p>Device SN</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10307",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10308",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10322",
            "description": "<p>Invalid SN</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10323",
            "description": "<p>Delete API error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Device Maintenance"
  },
  {
    "type": "patch",
    "url": "/api/deviceSet",
    "title": "Edit Device",
    "name": "DEVICE___EDIT_DEVICE",
    "group": "DeviceSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "md_sn",
            "description": "<p>Device SN</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vrm_id",
            "description": "<p>Vehicle id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "allowedValues": [
              "\"A\"",
              "\"I\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Device status</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Data version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10305",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10306",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10312",
            "description": "<p>Invalid SN</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10313",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10314",
            "description": "<p>Vehicle binded</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10315",
            "description": "<p>Vehicle not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10316",
            "description": "<p>Delete API error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10318",
            "description": "<p>Add API error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10319",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10320",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10321",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Device Maintenance"
  },
  {
    "type": "get",
    "url": "/api/deviceSet",
    "title": "Get Device Data List",
    "name": "DEVICE___GET_DEVICE",
    "group": "DeviceSet",
    "version": "2.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of devices</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deviceSn",
            "description": "<p>Device SN [md_sn]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lastLocUpdate",
            "description": "<p>Last GPS update timestamp [last_loc_update_ts]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.licence",
            "description": "<p>Binded vehicle data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence.licence",
            "description": "<p>Licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence.vrm_id",
            "description": "<p>Vehicle id [vrm_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.lat",
            "description": "<p>Latitude [lat]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.lng",
            "description": "<p>Longitude [lng]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>Device status [status]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Last updated information [update_ts, update_user]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Data version [version]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"deviceSn\": \"1000-2000-0000-8a01\",\n            \"lastLocUpdate\": \"2017-04-10 14:24:33\",\n            \"licence\": {\n                \"licence\": \"EX196\",\n                \"vrm_id\": \"28\"\n            },\n            \"lat\": 22.3327952,\n            \"lng\": 114.2129047,\n            \"status\": \"I\",\n            \"updated_by\": \"2018-01-12 13:27:42 (ben)\",\n            \"version\": \"2\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10302",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Device Maintenance"
  },
  {
    "type": "get",
    "url": "/api/deviceSet",
    "title": "Get Device Data List",
    "name": "DEVICE___GET_DEVICE",
    "group": "DeviceSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of devices</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deviceSn",
            "description": "<p>Device SN [md_sn]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lastLocUpdate",
            "description": "<p>Last GPS update timestamp [last_loc_update_ts]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.licence",
            "description": "<p>Vehicle data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence.licence",
            "description": "<p>Licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence.vrm_id",
            "description": "<p>Vehicle id [vrm_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.lat",
            "description": "<p>Latitude [lat]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.lng",
            "description": "<p>Longitude [lng]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>Device status [status]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Last updated information [update_ts, update_user]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Data version [version]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"deviceSn\": \"1000-2000-0000-8a01\",\n            \"lastLocUpdate\": \"2017-04-10 14:24:33\",\n            \"licence\": {\n                \"licence\": \"EX196\",\n                \"vrm_id\": \"28\"\n            },\n            \"lat\": 22.3327952,\n            \"lng\": 114.2129047,\n            \"status\": \"I\",\n            \"updated_by\": \"2018-01-12 13:27:42 (ben)\",\n            \"version\": \"2\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10302",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc_history.js",
    "groupTitle": "Device Maintenance"
  },
  {
    "type": "get",
    "url": "/api/licenceAddL",
    "title": "Get Licence Plate List (Device Dialog)",
    "name": "DEVICE___GET_LICENCE",
    "group": "DeviceSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of vehicles</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence",
            "description": "<p>Licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vrm_id",
            "description": "<p>Vehicle id [vrm_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"licence\": \"1001-1800-1138-cfac\",\n            \"vrm_id\": \"2337\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10301",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Device Maintenance"
  },
  {
    "type": "get",
    "url": "/api/download/:filename/:type/:data",
    "title": "Download File",
    "name": "DOWNLOAD___DOWNLOAD_FILE",
    "group": "Download",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Download filename</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"text/csv\"",
              "\"application/zip\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>File type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>System generated filename</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "-",
            "description": "<p>File stream</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_12201",
            "description": "<p>File not exists</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_12202",
            "description": "<p>Wrong parameter</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Download"
  },
  {
    "type": "post",
    "url": "/api/drivergrpSet",
    "title": "Add Driver Group",
    "name": "DRIVERGRP___ADD_DRIVER_GRP",
    "group": "DriverGrpSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_alias",
            "description": "<p>Driver group name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_descpt",
            "description": "<p>Driver group description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Deaprtment id</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": false,
            "field": "driverBelong",
            "description": "<p>Drivers belong to group</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driverBelong.id",
            "description": "<p>Driver id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driverBelong.name",
            "description": "<p>Driver name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10403",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10404",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10411",
            "description": "<p>MySql error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Group Maintenance"
  },
  {
    "type": "delete",
    "url": "/api/drivergrpSet",
    "title": "Delete Driver Group",
    "name": "DRIVERGRP___DELETE_DRIVER_GRP",
    "group": "DriverGrpSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "drv_grp_id",
            "description": "<p>Driver group id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10407",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10408",
            "description": "<p>Link records exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10409",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10410",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Group Maintenance"
  },
  {
    "type": "patch",
    "url": "/api/drivergrpSet",
    "title": "Edit Driver Group",
    "name": "DRIVERGRP___EDIT_DRIVER_GRP",
    "group": "DriverGrpSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "drv_grp_id",
            "description": "<p>Driver group id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_alias",
            "description": "<p>Driver group name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_descpt",
            "description": "<p>Driver group description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Deaprtment id</p>"
          },
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": false,
            "field": "driverBelong",
            "description": "<p>Drivers belong to group</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driverBelong.id",
            "description": "<p>Driver id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driverBelong.name",
            "description": "<p>Driver name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Data version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10405",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10406",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10412",
            "description": "<p>MySql error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Group Maintenance"
  },
  {
    "type": "get",
    "url": "/api/drivergrpAddL",
    "title": "Get Driver List (Driver Group Dialog)",
    "name": "DRIVERGRP___GET_DRIVER",
    "group": "DriverGrpSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of drivers</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Driver name [name]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Driver id [driver_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"name\": \"666\",\n            \"id\": \"2337\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10401",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Group Maintenance"
  },
  {
    "type": "post",
    "url": "/api/drivergrpImport",
    "title": "Import Driver Group",
    "name": "DRIVERGRP___IMPORT_DRIVER_GRP",
    "group": "DriverGrpSet",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "-",
            "description": "<p>File stream</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "add_group_count",
            "description": "<p>Group import count</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "add_grpdriver_count",
            "description": "<p>Group driver import count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"add_group_count\": 5,\n    \"add_grpdriver_count\": 5\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10413",
            "description": "<p>Empty CSV file</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10414",
            "description": "<p>Not ASCI or UTF-8</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10415",
            "description": "<p>Wrong input pattern</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10416",
            "description": "<p>Department not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10417",
            "description": "<p>Read CSV fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10418",
            "description": "<p>Upload file error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10419",
            "description": "<p>Driver Group not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10420",
            "description": "<p>Driver not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10421",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10422",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10423",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10424",
            "description": "<p>Duplicate group name</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10425",
            "description": "<p>Duplicate driver in one group</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10426",
            "description": "<p>File not sorted</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10427",
            "description": "<p>Groups not added</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10428",
            "description": "<p>Vehicles not added</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\",\n    \"data\": [1,3,6,8,20]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Group Maintenance"
  },
  {
    "type": "get",
    "url": "/api/drivergrpSet",
    "title": "Get Driver Group Data List",
    "name": "DRIVER___GET_DRIVER",
    "group": "DriverGrpSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of driver groups</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.drivergrpId",
            "description": "<p>Driver group ID [drv_grp_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.department",
            "description": "<p>Department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.id",
            "description": "<p>Department ID [ou_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupDesc",
            "description": "<p>Driver group description [grp_descpt]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupName",
            "description": "<p>Driver group name [grp_alias]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.driverBelong",
            "description": "<p>Driver data belongs to group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driverBelong.name",
            "description": "<p>Driver name [name]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driverBelong.id",
            "description": "<p>Driver ID [driver_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Last updated information [update_ts, update_user]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Data version [version]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "departments",
            "description": "<p>List of departments</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.department",
            "description": "<p>Department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.id",
            "description": "<p>Department ID [ou_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"drivergrpId\": 4,\n            \"department\": {\n                \"department\": \"Root\",\n                \"id\": \"5\"\n            },\n            \"groupDesc\": \"Driver Group B\",\n            \"groupName\": \"DRV_GRP_B\",\n            \"driverBelong\": [\n                {\n                    \"name\": \"6666\",\n                    \"id\": \"5\"\n                }\n            ],\n            \"updated_by\": \"2016-09-27 03:29:20 (SYSTEM)\",\n            \"version\": \"0\"\n        }\n    ],\n    \"departments\": [\n        {\n            \"department\": \"8\",\n            \"id\": \"265\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10402",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Group Maintenance"
  },
  {
    "type": "post",
    "url": "/api/driverSet",
    "title": "Add Driver",
    "name": "DRIVER___ADD_DRIVER",
    "group": "DriverSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driver_code",
            "description": "<p>Driver code</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Driver name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of birth</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Deaprtment id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "phone_home",
            "description": "<p>Home tel. number</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "phone_office",
            "description": "<p>Office tel. number</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "phone_mobile",
            "description": "<p>Mobile phone number</p>"
          },
          {
            "group": "Request Body",
            "type": "Blob",
            "optional": false,
            "field": "photo",
            "description": "<p>Driver avatar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10523",
            "description": "<p>Driver already exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10524",
            "description": "<p>Call API error (add)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10503",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10504",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Maintenance"
  },
  {
    "type": "delete",
    "url": "/api/driverSet",
    "title": "Delete Driver",
    "name": "DRIVER___DELETE_DRIVER",
    "group": "DriverSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driver_id",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10507",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10508",
            "description": "<p>Linked records exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10509",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10525",
            "description": "<p>Call API error (delete)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Maintenance"
  },
  {
    "type": "patch",
    "url": "/api/driverSet",
    "title": "Edit Driver",
    "name": "DRIVER___EDIT_DRIVER",
    "group": "DriverSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driver_id",
            "description": "<p>Driver id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driver_code",
            "description": "<p>Driver code</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Driver name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of birth</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Deaprtment id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "phone_home",
            "description": "<p>Home tel. number</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "phone_office",
            "description": "<p>Office tel. number</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "phone_mobile",
            "description": "<p>Mobile phone number</p>"
          },
          {
            "group": "Request Body",
            "type": "Blob",
            "optional": false,
            "field": "photo",
            "description": "<p>Driver avatar</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Data version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10505",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10506",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10517",
            "description": "<p>MySql error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Maintenance"
  },
  {
    "type": "get",
    "url": "/api/drvAvatar/:driver_id",
    "title": "Get Driver Avatar",
    "name": "DRIVER___GET_AVATAR",
    "group": "DriverSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "driver_id",
            "description": "<p>Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Blob",
            "optional": false,
            "field": "data",
            "description": "<p>Driver avatar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": \"data:image\\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtQAAAJZCAYAAAC\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10501",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Maintenance"
  },
  {
    "type": "get",
    "url": "/api/driverSet",
    "title": "Get Driver Data List",
    "name": "DRIVER___GET_DRIVER",
    "group": "DriverSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of drivers</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.defaultdrv",
            "description": "<p>Default driver [is_default]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.driverId",
            "description": "<p>Driver id [driver_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driverCode",
            "description": "<p>Driver code [driver_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.department",
            "description": "<p>Department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.id",
            "description": "<p>Department id [ou_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Driver name [name]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.dobirth",
            "description": "<p>Date of birth [dob]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.phoneHome",
            "description": "<p>Home tel. number [phone_home]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.phoneMobile",
            "description": "<p>Mobile phone number [phone_mobile]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.phoneOffice",
            "description": "<p>Office tel. number [phone_office]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Last updated information [update_ts, update_user]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Data version [version]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "departments",
            "description": "<p>List of departments</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.department",
            "description": "<p>Department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.id",
            "description": "<p>Department id [ou_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"defaultdrv\": \"N\",\n            \"department\": {\n                \"department\": \"Root\",\n                \"id\": \"5\"\n            },\n            \"dobirth\": \"1983-10-01\",\n            \"driverCode\": \"90123\",\n            \"driverId\": 1\n            \"name\": \"Chan Tai Man\",\n            \"phoneHome\": \"21234567\",\n            \"phoneMobile\": \"91234567\",\n            \"phoneOffice\": null,\n            \"staffId\": \"1D0049E425\",\n            \"updated_by\": \"2016-09-27 03:29:20 (SYSTEM)\",\n            \"version\": \"0\"\n        }\n    ],\n    \"departments\": [\n        {\n            \"department\": \"8\",\n            \"id\": \"265\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10502",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Maintenance"
  },
  {
    "type": "post",
    "url": "/api/driverImport",
    "title": "Import Driver",
    "name": "DRIVER___IMPORT_DRIVER",
    "group": "DriverSet",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "-",
            "description": "<p>File stream</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>Import count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": 5\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10510",
            "description": "<p>Wrong input pattern</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10511",
            "description": "<p>Upload file error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10512",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10513",
            "description": "<p>Read CSV fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10514",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10515",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10518",
            "description": "<p>Empty CSV file</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10519",
            "description": "<p>Not ASCI or UTF-8</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10520",
            "description": "<p>Department not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10521",
            "description": "<p>Driver already exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10522",
            "description": "<p>No record affected in Yuwei DB</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\",\n    \"data\": [1,3,6,8,20]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Driver Maintenance"
  },
  {
    "type": "get, post, patch, delete",
    "url": "/api/xxx",
    "title": "Not Found",
    "name": "Not_Found",
    "group": "Exception",
    "version": "1.0.0",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "HttpError_404",
            "description": "<p>URL not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"message\": \"Not Found\",\n    \"code\": \"404\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Exception"
  },
  {
    "type": "get",
    "url": "/api/liveLocation/:map",
    "title": "Get Live Location",
    "name": "LIVELOCATION",
    "group": "LiveLocation",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"googleMap\"",
              "\"baiduMap\""
            ],
            "optional": false,
            "field": "map",
            "description": "<p>Map type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of vehicle's live location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.brand",
            "description": "<p>Vehicle brand [brand]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.model",
            "description": "<p>Vehicle model [model]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Vehicle department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driver",
            "description": "<p>Vehicle current driver data [name,title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.last_loc_update_ts",
            "description": "<p>Last GPS update timestamp (last_loc_update_ts)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.last_loc_update_ts_utc",
            "description": "<p>Last GPS update timestamp millionseconds (last_loc_update_ts)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.lat",
            "description": "<p>Latitude [lat]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.lng",
            "description": "<p>Longitude [lng]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence",
            "description": "<p>Vehicle licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.runStatus",
            "description": "<p>Vehicle running status (GPS) [last_loc_update_ts]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.sn",
            "description": "<p>Vehicle device sn [md_sn]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Vehicle type [veh_type_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataCnt",
            "description": "<p>Vehicle running status (GPS) count</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dataCnt.offline",
            "description": "<p>Count for offline (1-4 days) [last_loc_update_ts]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dataCnt.offlinegt",
            "description": "<p>Count for offline (&gt;4 days) [last_loc_update_ts]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dataCnt.online",
            "description": "<p>Count for online (&lt;24 hours) [last_loc_update_ts]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "deviceCnt",
            "description": "<p>Vehicle device status count</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "deviceCnt.A",
            "description": "<p>Count for active [status]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "deviceCnt.I",
            "description": "<p>Count for inactive [status]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"brand\": \"Honda\",\n            \"department\": \"lv1 u4\",\n            \"driver\": null,\n            \"last_loc_update_ts\": \"2019-03-20 09:18:31\",\n            \"last_loc_update_ts_utc\": 1553044711000,\n            \"lat\": 22.26263333333333,\n            \"licence\": \"GS-Tester-A-0762\",\n            \"lng\": 114.25042,\n            \"model\": \"Freed\",\n            \"runStatus\": \"online\",\n            \"sn\": \"1001-1800-0762-d48c\",\n            \"status\": \"A\",\n            \"type\": \"OTHERS_DEFAULT\"\n        }\n    ],\n    \"dataCnt\": {\n        \"offline\": 0,\n        \"offlinegt\": 483,\n        \"online\": 2\n    },\n    \"deviceCnt\": {\n        \"A\": 404,\n        \"I\": 81\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 400 Bad Request\n {\n     \"message\": \"Fail\",\n     \"code\": \"1xxxx\",\n     \"data\": [\n        {\n             \"brand\": \"Honda\",\n             \"department\": \"lv1 u4\",\n             \"driver\": null,\n             \"last_loc_update_ts\": \"2019-03-20 09:18:31\",\n             \"last_loc_update_ts_utc\": 1553044711000,\n             \"lat\": null,\n             \"licence\": \"GS-Tester-A-0762\",\n             \"lng\": null,\n             \"model\": \"Freed\",\n             \"runStatus\": \"online\",\n             \"sn\": \"1001-1800-0762-d48c\",\n             \"status\": \"A\",\n             \"type\": \"OTHERS_DEFAULT\"\n         }\n     ],\n\t\t\"dataCnt\": {\n         \"offline\": 0,\n         \"offlinegt\": 483,\n         \"online\": 2\n     },\n     \"deviceCnt\": {\n         \"A\": 404,\n         \"I\": 81\n     }\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10101",
            "description": "<p>Baidu Call error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10102",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Live Location"
  },
  {
    "type": "patch",
    "url": "/api/mailNotifySet",
    "title": "Edit Email Notification",
    "name": "MAILNOTIFY___EDIT_MAILNOTIFY",
    "group": "MailNotifySet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "mail_notify_id",
            "description": "<p>Notification item id</p>"
          },
          {
            "group": "Request Body",
            "type": "Array",
            "optional": false,
            "field": "notifyEmail",
            "description": "<p>Notification receiver</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "allowedValues": [
              "\"A\"",
              "\"I\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Notification status</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Data version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11902",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11903",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11904",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Email Notification Maintenance"
  },
  {
    "type": "get",
    "url": "/api/mailNotifySet",
    "title": "Get Email Notification List",
    "name": "MAILNOTIFY___GET_MAILNOTIFY",
    "group": "MailNotifySet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of notification item</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.notifyItem",
            "description": "<p>Notification item [notify_item]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.notifyItemId",
            "description": "<p>Notification item id [mail_notify_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data.notifyEmail",
            "description": "<p>Notification receiver [notify_email]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>Notification status [status]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Last updated information [update_ts, update_user]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Data version [version]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"notifyEmail\": [\"aa@testing.com\", \"bb@testing.com\", \"cc@testing.com\"],\n            \"notifyItem\": \"veh_offline_report\",\n            \"notifyItemId\": 1,\n            \"status\": \"OFF\",\n            \"updated_by\": \"2019-01-18 15:10:38 (zilvia)\",\n            \"version\": \"2\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11901",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Email Notification Maintenance"
  },
  {
    "type": "patch",
    "url": "/api/mailNotifyStatus",
    "title": "Set Email Notification Status",
    "name": "MAILNOTIFY___SET_MAILNOTIFY_STATUS",
    "group": "MailNotifySet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "mail_notify_id",
            "description": "<p>Notification item id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "allowedValues": [
              "\"A\"",
              "\"I\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>Notification status</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Data version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11905",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11906",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11907",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Email Notification Maintenance"
  },
  {
    "type": "post",
    "url": "/api/orgchartSet",
    "title": "Add Department",
    "name": "ORGCHART___ADD_ORGCHART",
    "group": "OrgChartSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "descpt",
            "description": "<p>Department description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "parent_id",
            "description": "<p>Parent department id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11703",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11704",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11705",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Orginization Chart Maintenance"
  },
  {
    "type": "delete",
    "url": "/api/orgchartSet",
    "title": "Delete Department",
    "name": "ORGCHART___DELETE_ORGCHART",
    "group": "OrgChartSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Department id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11709",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11710",
            "description": "<p>Link records exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11711",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Orginization Chart Maintenance"
  },
  {
    "type": "patch",
    "url": "/api/orgchartSet",
    "title": "Edit Department",
    "name": "ORGCHART___EDIT_ORGCHART",
    "group": "OrgChartSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Department id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "descpt",
            "description": "<p>Department description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "parent_id",
            "description": "<p>Parent department id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Data version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11706",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11707",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11708",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Orginization Chart Maintenance"
  },
  {
    "type": "get",
    "url": "/api/orgchartAddLL",
    "title": "Get Department List (Organization Chart Dialog)",
    "name": "ORGCHART___GET_DEPARTMENTS",
    "group": "OrgChartSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of departments</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.parent_descpt",
            "description": "<p>Department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.parent_id",
            "description": "<p>Department id [ou_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"parent_descpt\": \"8\",\n            \"parent_id\": \"265\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11701",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Orginization Chart Maintenance"
  },
  {
    "type": "get",
    "url": "/api/orgchartSet",
    "title": "Get Department List",
    "name": "ORGCHART___GET_ORGCHART",
    "group": "OrgChartSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of departments</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.descpt",
            "description": "<p>Department description [descpt]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Department id [ou_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.parentData",
            "description": "<p>Parent Department data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.parentData.parent_id",
            "description": "<p>Parent Department id [ou_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.parentData.parent_descpt",
            "description": "<p>Parent Department title [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.showFunc",
            "description": "<p>Display function</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.children",
            "description": "<p>List of children departments data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"department\": \"Root\"\n            \"descpt\": \"root\"\n            \"id\": \"5\"\n            \"parentData\": {\n                \"parent_id\": null,\n                \"parent_descpt\": null\n            },\n            \"showFunc\": false,\n            \"children\": [],\n            \"updated_by\": \"2018-09-24 13:11:32 (admin)\",\n            \"version\": \"1\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11702",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Orginization Chart Maintenance"
  },
  {
    "type": "get",
    "url": "/companyScore/{type}/{start_date}/{end_date}",
    "title": "Get Company Score (Profile)",
    "name": "PROFILE___COMPANY_SCORE",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_date",
            "description": "<p>Start date of the data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.total_score",
            "description": "<p>Total score of all warnings</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.start_date",
            "description": "<p>Start date of the data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"start_date\": \"2019-03-10\",\n            \"total_score\": 37.36,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"lldw\": 32,\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11201",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/drvgrpScore/{type}/{start_date}/{end_date}/{mode}",
    "title": "Get Driver Group Score (Profile - Company)",
    "name": "PROFILE___DRIVERGRP_SCORE",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>ID of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>ID of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"Testing Group\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"Testing Group\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11207",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11208",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11210",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/drvgrpScore/{type}/{start_date}/{end_date}/{mode}/{id}",
    "title": "Get Driver Group Score (Profile - Group)",
    "name": "PROFILE___DRIVERGRP_SCORE_INDIVIDUAL",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the target (group)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>ID of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>ID of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"Testing Group\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"Testing Group\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11207",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11208",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11210",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/driverScore/{type}/{start_date}/{end_date}/{mode}",
    "title": "Get Driver Score (Profile - Company)",
    "name": "PROFILE___DRIVER_SCORE",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\"",
              "\"i\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Driver ID of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>Driver ID of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"Chan Tai Man\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"Chan Tai Man\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11201",
            "description": "<p>MySql errors</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/driverScore/{type}/{start_date}/{end_date}/{mode}/{id}",
    "title": "Get Driver Score (Profile - Group/ Individual)",
    "name": "PROFILE___DRIVER_SCORE_INDIVIDUAL",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\"",
              "\"i\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the target (group/ individual)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Driver ID of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>Driver ID of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"Chan Tai Man\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"Chan Tai Man\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11202",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11203",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11204",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11206",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/profileList/{profile}",
    "title": "Get Filter List",
    "name": "PROFILE___GET_FILTER_LIST",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"di\"",
              "\"dg\"",
              "\"vi\"",
              "\"vg\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>ID of the individual/ vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>name of the individual/ vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"id\":\"197\",\n            \"name\":\"CSV Testing [Root]\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11223",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11224",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/profileBase/{profile}/{id}",
    "title": "Get Profile Base Info",
    "name": "PROFILE___GET_INFO",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"di\"",
              "\"dg\"",
              "\"vi\"",
              "\"vg\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Target ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of base info</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.brand",
            "description": "<p>Brand of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the vehicle/ vehicle group/ driver/ driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.description",
            "description": "<p>Description of the group vehicle group/ driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.model",
            "description": "<p>Model of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the vehicle/ vehicle group/ driver/ driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Type of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.year",
            "description": "<p>Year of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.dob",
            "description": "<p>Date of Birth of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.phone_home",
            "description": "<p>Home Telephone of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.phone_mobile",
            "description": "<p>Mobile of the driver</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\":\"Success\",\n    \"data\":\t[\n        {\n            \"description\":\"Testing group\",\n            \"name\":\"Testing\",\n            \"department\":\"Root\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11226",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11227",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/profileVideo/{profile}/{start_date}/{end_date}",
    "title": "Get Warning Video Table (Profile - Company)",
    "name": "PROFILE___GET_VIDEO_TABLE",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"di\"",
              "\"dg\"",
              "\"vi\"",
              "\"vg\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning video</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.warningType",
            "description": "<p>Warning Type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_time",
            "description": "<p>Starting time of the warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.duration",
            "description": "<p>Duration of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.end_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.top_spd",
            "description": "<p>Top speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hw",
            "description": "<p>Headway(HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.near_hw",
            "description": "<p>Nearest headway (HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.roc",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.state",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.video",
            "description": "<p>Video ID of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.videoReady",
            "description": "<p>Status of video uploading</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driver",
            "description": "<p>Driver of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicle",
            "description": "<p>Vehicle of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvDepartment",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehDepartment",
            "description": "<p>Department of the vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\":\"Success\",\n    \"data\": [\n        {\n            \"warningType\":\"FCW\",\n            \"start_time\":\"2019-04-10 08:42:51\",\n            \"duration\":0.88,\n            \"start_spd\":38,\n            \"end_spd\":32,\n            \"top_spd\":38,\n            \"hw\":1.2,\n            \"near_hw\":1,\n            \"roc\":6.7999999999999998,\n            \"state\":7,\n            \"video\":\"1_20190410_084250_UuHvV82\",\n            \"videoReady\":\"Y\",\n            \"driver\":null,\n            \"vehicle\":\"GS-Tester-A-0762\",\n            \"drvDepartment\":null,\n            \"vehDepartment\":\"lv1 u4\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11228",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11229",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/profileVideo/{profile}/{start_date}/{end_date}/{id}",
    "title": "Get Warning Video Table (Profile - Group/ Individual)",
    "name": "PROFILE___GET_VIDEO_TABLE__W_ID",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\",\"",
              "\",\"",
              "\",\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Target ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning video</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.warningType",
            "description": "<p>Warning Type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_time",
            "description": "<p>Starting time of the warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.duration",
            "description": "<p>Duration of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.end_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.top_spd",
            "description": "<p>Top speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hw",
            "description": "<p>Headway(HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.near_hw",
            "description": "<p>Nearest headway (HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.roc",
            "description": "<p>Rate of change of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.state",
            "description": "<p>Driver action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.video",
            "description": "<p>Video ID of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.videoReady",
            "description": "<p>Status of video uploading</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driver",
            "description": "<p>Driver of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicle",
            "description": "<p>Vehicle of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvDepartment",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehDepartment",
            "description": "<p>Department of the vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n     \"message\":\"Success\",\n     \"data\": [\n         {\n             \"warningType\":\"FCW\",\n             \"start_time\":\"2019-04-10 08:42:51\",\n             \"duration\":0.88,\n             \"start_spd\":38,\n             \"end_spd\":32,\n             \"top_spd\":38,\n             \"hw\":1.2,\n             \"near_hw\":1,\n             \"roc\":6.7999999999999998,\n             \"state\":7,\n             \"video\":\"1_20190410_084250_UuHvV82\",\n             \"videoReady\":\"Y\",\n             \"driver\":null,\n             \"vehicle\":\"GS-Tester-A-0762\",\n             \"drvDepartment\":null,\n             \"vehDepartment\":\"lv1 u4\"\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11228",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11229",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/profileQuerySpecWarn/{profile}/{start_time}/{end_time}/{warn}",
    "title": "Get Specfic Warning Detail (Profile - Company)",
    "name": "PROFILE___QUERY_SPEC_WARNING_DETAIL",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"di\"",
              "\"dg\"",
              "\"vi\"",
              "\"vg\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "warn",
            "description": "<p>Target warning</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning video</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_time",
            "description": "<p>Starting time of the warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.duration",
            "description": "<p>Duration of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.end_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.top_spd",
            "description": "<p>Top speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hw",
            "description": "<p>Headway(HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.near_hw",
            "description": "<p>Nearest headway (HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.state",
            "description": "<p>Driver action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.video",
            "description": "<p>Video ID of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.videoReady",
            "description": "<p>Status of video uploading</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driver",
            "description": "<p>Driver of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicle",
            "description": "<p>Vehicle of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvDepartment",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehDepartment",
            "description": "<p>Department of the vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n     \"message\":\"Success\",\n     \"data\": [\n         {\n             \"start_time\":\"2019-04-10 08:42:51\",\n             \"duration\":0.88,\n             \"start_spd\":38,\n             \"end_spd\":32,\n             \"top_spd\":38,\n             \"hw\":1.2,\n             \"near_hw\":1,\n             \"state\":7,\n             \"video\":\"1_20190410_084250_UuHvV82\",\n             \"videoReady\":\"Y\",\n             \"driver\":null,\n             \"vehicle\":\"GS-Tester-A-0762\",\n             \"drvDepartment\":null,\n             \"vehDepartment\":\"lv1 u4\"\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11231",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11232",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/profileQuerySpecWarn/{profile}/{start_time}/{end_time}/{warn}/{id}",
    "title": "Get Specfic Warning Detail (Profile - Group/ Individual)",
    "name": "PROFILE___QUERY_SPEC_WARNING_DETAIL__W_ID",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"di\"",
              "\"dg\"",
              "\"vi\"",
              "\"vg\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "warn",
            "description": "<p>Target warning</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Target ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning video</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_time",
            "description": "<p>Starting time of the warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.duration",
            "description": "<p>Duration of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.end_spd",
            "description": "<p>Speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.top_spd",
            "description": "<p>Top speed of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hw",
            "description": "<p>Headway(HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.near_hw",
            "description": "<p>Nearest headway (HW) of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.state",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.video",
            "description": "<p>Video ID of warning</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.videoReady",
            "description": "<p>Status of video uploading</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driver",
            "description": "<p>Driver of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicle",
            "description": "<p>Vehicle of the trip</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvDepartment",
            "description": "<p>Department of the driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehDepartment",
            "description": "<p>Department of the vehicle</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n     \"message\":\"Success\",\n     \"data\": [\n         {\n             \"start_time\":\"2019-04-10 08:42:51\",\n             \"duration\":0.88,\n             \"start_spd\":38,\n             \"end_spd\":32,\n             \"top_spd\":38,\n             \"hw\":1.2,\n             \"near_hw\":1,\n             \"state\":7,\n             \"video\":\"1_20190410_084250_UuHvV82\",\n             \"videoReady\":\"Y\",\n             \"driver\":null,\n             \"vehicle\":\"GS-Tester-A-0762\",\n             \"drvDepartment\":null,\n             \"vehDepartment\":\"lv1 u4\"\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11231",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11232",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/vehgrpScore/{type}/{start_date}/{end_date}/{mode}",
    "title": "Get Vehicle Group Score (Profile - Company)",
    "name": "PROFILE___VEHICLEGRP_SCORE",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>ID of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>ID of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"Testing Group\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"Testing Group\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11216",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11217",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11219",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/vehgrpScore/{type}/{start_date}/{end_date}/{mode}/{id}",
    "title": "Get Vehicle Group Score (Profile - Group)",
    "name": "PROFILE___VEHICLEGRP_SCORE_INDIVIDUAL",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the target (group)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>ID of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>ID of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"Testing Group\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"Testing Group\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11216",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11217",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11219",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/vehicleScore/{type}/{start_date}/{end_date}/{mode}",
    "title": "Get Vehicle Score (Profile - Company)",
    "name": "PROFILE___VEHICLE_SCORE",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\"",
              "\"i\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>ID of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>ID of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"GS-Tester-A-0762\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n        {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"GS-Tester-A-0762\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11211",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11212",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11213",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11215",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/vehicleScore/{type}/{start_date}/{end_date}/{mode}/{id}",
    "title": "Get Vehicle Score (Profile - Group/ Individual)",
    "name": "PROFILE___VEHICLE_SCORE_INDIVIDUAL",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"g\"",
              "\"i\""
            ],
            "optional": false,
            "field": "mode",
            "description": "<p>Mode of viewing</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the target (group/ individual)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Name of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>ID of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.name",
            "description": "<p>Name of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.id",
            "description": "<p>ID of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.department",
            "description": "<p>Department of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb",
            "description": "<p>VB warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataActCnt",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.aaw",
            "description": "<p>AAW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.abw",
            "description": "<p>ABW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.fcw",
            "description": "<p>FCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_h",
            "description": "<p>HMW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_l",
            "description": "<p>HMW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.hmw_m",
            "description": "<p>HMW M warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.lldw",
            "description": "<p>LLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw",
            "description": "<p>PCW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.pcw_l",
            "description": "<p>PCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.rldw",
            "description": "<p>RLDW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.spw",
            "description": "<p>SPW warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_h",
            "description": "<p>UFCW H warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.ufcw_l",
            "description": "<p>UFCW L warning count/100km</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataActCnt.vb",
            "description": "<p>VB warning count/100km</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw\": 0.3,\n            \"aaw_score\": 97,\n            \"abw\": 1.5,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"department\": \"Root\",\n            \"fcw\": 2.7,\n            \"fcw_score\": 82.07,\n            \"hmw_h\": 3.9,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l\": 0,\n            \"hmw_l_score\": 100,\n            \"hmw_m\": 8,\n            \"hmw_m_score\": 89.9,\n            \"id\": 88,\n            \"lldw\": 12.2,\n            \"lldw_score\": 84.7,\n            \"name\": \"GS-Tester-A-0762\",\n            \"pcw\": 6.6,\n            \"pcw_l\": 3,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw\": 24.1,\n            \"rldw_score\": 69.75,\n            \"spw\": 6.3,\n            \"spw_score\": 84.3,\n            \"ufcw_h\": 27.4,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l\": 42.3,\n            \"ufcw_l_score\": 64.67,\n            \"vb\": 5.1,\n            \"vb_score\": 100\n        }\n    ],\n    \"dataActCnt\": [\n         {\n            \"aaw\": 3,\n            \"abw\": 12,\n            \"drv_distance\": 325.3,\n            \"department\": \"Root\",\n            \"fcw\": 23,\n            \"hmw_h\": 29,\n            \"hmw_l\": 0,\n            \"hmw_m\": 46,\n            \"id\": 88,\n            \"lldw\": 32,\n            \"name\": \"GS-Tester-A-0762\",\n            \"pcw\": 18,\n            \"pcw_l\": 10,\n            \"rldw\": 53,\n            \"spw\": 17,\n            \"start_date\": \"2019-03-09\",\n            \"ufcw_h\": 154,\n            \"ufcw_l\": 184,\n            \"vb\": 32\n         }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11211",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11212",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11213",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11215",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/warningRank/{type}/{start_date}/{end_date}/{profile}",
    "title": "Get Warning Rank (Profile - Company)",
    "name": "PROFILE___WARNING_RANK",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"di\"",
              "\"dg\"",
              "\"vi\"",
              "\"vg\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_date",
            "description": "<p>Start date of the record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.total_score",
            "description": "<p>Total score</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw_score\": 97,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"fcw_score\": 82.07,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l_score\": 100,\n            \"hmw_m_score\": 89.9,\n            \"lldw_score\": 84.7,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw_score\": 69.75,\n            \"spw_score\": 84.3,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l_score\": 64.67,\n            \"vb_score\": 100,\n            \"start_date\": \"2019-03-10\",\n            \"total_score\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11220",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11221",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "get",
    "url": "/warningRank/{type}/{start_date}/{end_date}/{profile}/{id}",
    "title": "Get Warning Rank (Profile - Group/ individual)",
    "name": "PROFILE___WARNING_RANK_INDIVIDUAL",
    "group": "Profile",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"d\"",
              "\"w\"",
              "\"m\"",
              "\"y\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Profile type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"c\"",
              "\"di\"",
              "\"dg\"",
              "\"vi\"",
              "\"vg\""
            ],
            "optional": false,
            "field": "profile",
            "description": "<p>Target Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Target ID (Group/ Individual)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.aaw_score",
            "description": "<p>AAW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.abw_score",
            "description": "<p>ABW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_distance",
            "description": "<p>Driving Distance</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fcw_score",
            "description": "<p>FCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_h_score",
            "description": "<p>HMW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_l_score",
            "description": "<p>HMW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.hmw_m_score",
            "description": "<p>HMW M warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lldw_score",
            "description": "<p>LLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_score",
            "description": "<p>PCW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pcw_l_score",
            "description": "<p>PCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rldw_score",
            "description": "<p>RLDW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.spw_score",
            "description": "<p>SPW warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_h_score",
            "description": "<p>UFCW H warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ufcw_l_score",
            "description": "<p>UFCW L warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vb_score",
            "description": "<p>VB warning score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_date",
            "description": "<p>Start date of the record</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.total_score",
            "description": "<p>Total score</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"aaw_score\": 97,\n            \"abw_score\": 85.1,\n            \"drv_distance\": 335.5,\n            \"fcw_score\": 82.07,\n            \"hmw_h_score\": 90.3,\n            \"hmw_l_score\": 100,\n            \"hmw_m_score\": 89.9,\n            \"lldw_score\": 84.7,\n            \"pcw_l_score\": 100,\n            \"pcw_score\": 56.2,\n            \"rldw_score\": 69.75,\n            \"spw_score\": 84.3,\n            \"ufcw_h_score\": 54.23,\n            \"ufcw_l_score\": 64.67,\n            \"vb_score\": 100,\n            \"start_date\": \"2019-03-10\",\n            \"total_score\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11220",
            "description": "<p>MySql errors</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_11221",
            "description": "<p>Wrong parameters</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Profile"
  },
  {
    "type": "post",
    "url": "/api/roster",
    "title": "Import roster",
    "name": "ROSTER",
    "group": "RosterSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Boolean",
            "allowedValues": [
              "true",
              "false"
            ],
            "optional": false,
            "field": "checkDriver",
            "description": "<p>Check if driver exists</p>"
          },
          {
            "group": "Request Body",
            "type": "Boolean",
            "allowedValues": [
              "true",
              "false"
            ],
            "optional": false,
            "field": "checkLicPlate",
            "description": "<p>Check if licence plate exists</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "roster",
            "description": "<p>Roster</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Response message from external call</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.totalRead",
            "description": "<p>Total number of import records</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>Import status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.result",
            "description": "<p>List of update messages</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.result.x",
            "description": "<p>Update message for line x</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.result.x.tripCnt",
            "description": "<p>Number of trip updated for line x</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.result.x.warnCnt",
            "description": "<p>Number of warning updated for line x</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.result.x.reason",
            "description": "<p>Error message for line x</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.result.x.errCode",
            "description": "<p>Error code for line x</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"totalRead\": 1,\n            \"status\": \"fail\",\n            \"result\": {\n                \"1\": {\n                    \"tripCnt\": 0,\n                    \"warnCnt\": 0\n                }\n            }\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"totalRead\": 1,\n            \"status\": \"success\",\n            \"result\": {\n                \"1\": {\n                    \"reason\": \"Invalid driver name or driver code.\",\n                    \"errCode\": \"ERR_0003\"\n                }\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11101",
            "description": "<p>Call server error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Roster"
  },
  {
    "type": "get",
    "url": "/api/getWarnVideo/:licence/:video_id",
    "title": "Streaming Video",
    "name": "WARNING___GET_VIDEO",
    "group": "Streaming",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "licence",
            "description": "<p>Licence Plate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "video_id",
            "description": "<p>Video id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "-",
            "description": "<p>File stream</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Fail\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Streaming"
  },
  {
    "type": "post",
    "url": "/requestPwdChange",
    "title": "Forget Password",
    "name": "PASSWORD___FORGET_PASSWORD",
    "group": "System",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comp",
            "description": "<p>Company code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Language</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10018",
            "description": "<p>Fail to encrypt request link</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10019",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10020",
            "description": "<p>Send email fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10032",
            "description": "<p>email not registered</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "System"
  },
  {
    "type": "get",
    "url": "/preresetpwd/{comp}/{token}",
    "title": "Get Preset Password Data",
    "name": "PASSWORD___GET_RESET_DATA",
    "group": "System",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comp",
            "description": "<p>Company code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10021",
            "description": "<p>Password already changed</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10022",
            "description": "<p>Link has expired</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10023",
            "description": "<p>Fail to decrypt request link</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10024",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10025",
            "description": "<p>Retrieve params fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10026",
            "description": "<p>Fail (no user data)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10027",
            "description": "<p>Company not match</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "System"
  },
  {
    "type": "post",
    "url": "/api/updatepw",
    "title": "Update Password",
    "name": "PASSWORD___UPDATE_PASSWORD",
    "group": "System",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Old password</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "newpassword",
            "description": "<p>New password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10010",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ValidationError_10011",
            "description": "<p>Fail (wrong old password)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10012",
            "description": "<p>Fail (no user data)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10015",
            "description": "<p>Fail (no row affected and add password history fail)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10016",
            "description": "<p>New password found in password history</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10017",
            "description": "<p>Restrict user to change password to only once per day</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10030",
            "description": "<p>Fail (no user data)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "System"
  },
  {
    "type": "post",
    "url": "/api/updateLang",
    "title": "Update Language",
    "name": "USER___UPDATE_LANG",
    "group": "System",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Language</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10006",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10007",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "System"
  },
  {
    "type": "post",
    "url": "/api/updateMap",
    "title": "Update Map",
    "name": "USER___UPDATE_MAP",
    "group": "System",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "map",
            "description": "<p>Map</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10008",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10009",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "System"
  },
  {
    "type": "get",
    "url": "/api/warnFilter/:filter_type",
    "title": "Get Trip Detail Filter List",
    "name": "WARNING___GET_FILTER_LIST",
    "group": "TripDetail",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"driver\"",
              "\"vehicle\"",
              "\"driverGrp\"",
              "\"vehicleGrp\""
            ],
            "optional": false,
            "field": "filter_type",
            "description": "<p>Filter type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of filter list data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licenceId",
            "description": "<p>Vehicle id [vrm_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence",
            "description": "<p>Vehicle licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driverId",
            "description": "<p>Driver id [driver_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Driver name [name]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupName",
            "description": "<p>Driver/Vehicle group name [grp_alias]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehiclegrpId",
            "description": "<p>Vehicle group id [vrm_grp_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drivergrpId",
            "description": "<p>Driver group id [drv_grp_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.vehicleBelong",
            "description": "<p>List of vehicles belong to group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicleBelong.id",
            "description": "<p>Vehicle id [vrm_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicleBelong.licence",
            "description": "<p>Vehicle licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.driverBelong",
            "description": "<p>List of drivers belong to group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Driver id [driver_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"licenceId\": \"2337\",\n            \"licence\": \"1001-1800-1138-cfac\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"groupName\": \"123\",\n            \"vehiclegrpId\": \"13\",\n            \"vehicleBelong\": {\n                \"id\": \"1327\",\n                \"licence\": \"GS-Tester-A-0938\"\n            }\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"driverId\": \"11753\",\n            \"name\": \"2223\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"groupName\": \"123\",\n            \"drivergrpId\": \"13\",\n            \"driverBelong\": {\n                \"id\": \"11753\",\n                \"name\": \"2223\"\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10202",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_10203",
            "description": "<p>Wrong parameter</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Detail"
  },
  {
    "type": "post",
    "url": "/api/warnTripData/:map/:filter_type",
    "title": "Get Trip Detail",
    "name": "WARNING___GET_TRIP_DATA",
    "group": "TripDetail",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"googleMap\"",
              "\"baiduMap\""
            ],
            "optional": false,
            "field": "map",
            "description": "<p>Map type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"driver\"",
              "\"vehicle\"",
              "\"driverGrp\"",
              "\"vehicleGrp\""
            ],
            "optional": false,
            "field": "filter_type",
            "description": "<p>Filter type</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>Start time</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "end",
            "description": "<p>End time</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Vehicle/Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of warning data of trip</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.duration",
            "description": "<p>Warning duration</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.end_spd",
            "description": "<p>Warning end speed</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.hw",
            "description": "<p>Warning headway distance</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.near_hw",
            "description": "<p>Warning nearest headway distance</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.start_spd",
            "description": "<p>Warning start speed</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.start_time",
            "description": "<p>Warning start time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_time_utc",
            "description": "<p>Warning start time millionseconds</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.state",
            "description": "<p>Driver action</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.top_spd",
            "description": "<p>Warning top speed</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.video",
            "description": "<p>Warning video id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.videoReady",
            "description": "<p>Warning video status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.warningType",
            "description": "<p>Warning type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dataPoint",
            "description": "<p>List of warning location data of trip</p>"
          },
          {
            "group": "Success 200",
            "type": "Number[]",
            "optional": false,
            "field": "dataPoint.mark",
            "description": "<p>Warning location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataPoint.warn",
            "description": "<p>Warning type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataPoint.video",
            "description": "<p>Warning video id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataPoint.videoReady",
            "description": "<p>Warning video status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"duration\": 1.64,\n            \"end_spd\": 35,\n            \"hw\": 0,\n            \"near_hw\": 0,\n            \"start_spd\": 35,\n            \"start_time\": \"2019-03-21 09:37:35\",\n            \"start_time_utc\": 1553132255,\n            \"state\": 2,\n            \"top_spd\": 35,\n            \"video\": \"2_20190321_093735_c7Eo9Ux\",\n            \"videoReady\": \"N\",\n            \"warningType\": \"PCW\"\n        }\n    ],\n    \"dataPoint\": [\n        {\n            \"mark\": [22.263154999999998, 114.23816666666669],\n            \"time_utc\": 1549807138,\n            \"video\": null,\n            \"videoReady\": null,\n            \"warn\": \"UFCW\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10206",
            "description": "<p>Baidu Call Error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10207",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_10208",
            "description": "<p>Wrong Parameter</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Detail"
  },
  {
    "type": "post",
    "url": "/api/warnTrip/:filter_type",
    "title": "Get Trip List",
    "name": "WARNING___GET_TRIP_LIST",
    "group": "TripDetail",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"driver\"",
              "\"vehicle\"",
              "\"driverGrp\"",
              "\"vehicleGrp\""
            ],
            "optional": false,
            "field": "filter_type",
            "description": "<p>Filter type</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "end",
            "description": "<p>End date</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "arrayData",
            "description": "<p>Vehicle/Driver id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of trip data by vehicle/driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.distance",
            "description": "<p>Trip distance [drv_distance]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_name",
            "description": "<p>Trip driver name [name]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drv_name_ou",
            "description": "<p>Driver department [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.duration",
            "description": "<p>Trip duration</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.endDate",
            "description": "<p>Trip end time [end_time]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence",
            "description": "<p>Trip vehicle licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence_ou",
            "description": "<p>Vehicle department [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.startDate",
            "description": "<p>Trip start time [start_time]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.trip_id",
            "description": "<p>Trip id [veh_trip_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.type",
            "description": "<p>Vehicle type [veh_type_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vrm_id",
            "description": "<p>Vehicle id [vrm_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driver_id",
            "description": "<p>Driver id [driver_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"distance\": \"0.0\",\n            \"drv_name\": null,\n            \"drv_name_ou\": null,\n            \"duration\": \"00:43\",\n            \"endDate\": \"2019-03-21 10:36:12\",\n            \"licence\": \"GS-Tester-A-0765\",\n            \"licence_ou: \"Root\",\n            \"startDate\": \"2019-03-21 09:52:42\",\n            \"trip_id\": \"2856441\",\n            \"type\": \"OTHERS_DEFAULT\",\n            \"vrm_id\": \"955\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"distance\": \"0.0\",\n            \"drv_name\": \"aa9a\",\n            \"drv_name_ou\": \"lv2 u6\",\n            \"duration\": \"00:43\",\n            \"endDate\": \"2019-03-21 10:36:12\",\n            \"licence\": \"GS-Tester-A-0765\",\n            \"licence_ou: \"Root\",\n            \"startDate\": \"2019-03-21 09:52:42\",\n            \"trip_id\": \"2856441\",\n            \"type\": \"OTHERS_DEFAULT\",\n            \"driver_id\": \"2179\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10204",
            "description": "<p>MySql error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParameterError_10205",
            "description": "<p>Wrong parameter</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Detail"
  },
  {
    "type": "get",
    "url": "/api/getWarningPath/:map/:trip_id",
    "title": "Get Trip Path",
    "name": "WARNING___GET_TRIP_PATH",
    "group": "TripDetail",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"googleMap\"",
              "\"baiduMap\""
            ],
            "optional": false,
            "field": "map",
            "description": "<p>Map type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trip_id",
            "description": "<p>Trip id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of trip path location</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        [22.26312133560225, 114.23867372697602],\n        [22.2631266, 114.2385086]\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_10209",
            "description": "<p>Baidu/ Google Call Fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10207",
            "description": "<p>Sql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Fail\",\n    \"data\": [\n        [22.26312133560225, 114.23867372697602],\n        [22.2631266, 114.2385086]\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Detail"
  },
  {
    "type": "get",
    "url": "/api/vehtripFilterList",
    "title": "Get Trip Filter List",
    "name": "VEHICLE_TRIP___GET_FILTER_LIST",
    "group": "TripSet",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Filter option lists</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.deptList",
            "description": "<p>Department option list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.id",
            "description": "<p>Department id [ou_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.name",
            "description": "<p>Department name [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.drvList",
            "description": "<p>Driver option list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvList.id",
            "description": "<p>Driver id [driver_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvList.name",
            "description": "<p>Driver name [name]</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.vehList",
            "description": "<p>Vehicle option list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.id",
            "description": "<p>Vehicle id [vrm_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.name",
            "description": "<p>Vehicle licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.ou_id",
            "description": "<p>Vehicle department id [ou_id]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"deptList\": [\n            {\n                \"id\": \"265\",\n                \"name\": \"8\"\n            }\n        ],\n        \"drvList\": [\n            {\n                \"id\": \"11753\",\n                \"name\": \"2223 [Root]\"\n            }\n        ],\n        \"vehList\": [\n            {\n                \"id\": \"2337\",\n                \"name\": \"1001-1800-1138-cfac [Root]\",\n                \"ou_id\": \"5\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11801",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Maintenance"
  },
  {
    "type": "post",
    "url": "/api/queryVehTrip",
    "title": "Get Trip Data",
    "name": "VEHICLE_TRIP___GET_TRIP",
    "group": "TripSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "end",
            "description": "<p>End date</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "drvid",
            "description": "<p>Driver id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehid",
            "description": "<p>Vehicle id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehdept",
            "description": "<p>Vehicle department</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of trip data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.driver",
            "description": "<p>Driver name [name]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvDepart",
            "description": "<p>Driver department [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvId",
            "description": "<p>Driver id [driver_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.start_time",
            "description": "<p>Start time [start_time]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.end_time",
            "description": "<p>End time [end_time]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.tripId",
            "description": "<p>Trip id [veh_trip_id]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicle",
            "description": "<p>Vehicle licence plate [vrm_mark_code]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehDepart",
            "description": "<p>Vehicle department [title]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Last updated information [update_ts, update_user]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Data version [version]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"driver\": \"28\",\n            \"drvDepart\": \"Root\",\n            \"drvId\": \"12193\",\n            \"end_time\": \"2019-03-22 08:32:55\",\n            \"start_time\": \"2019-03-22 08:10:53\",\n            \"tripId\": 2859915,\n            \"updated_by\": \"2019-03-22 12:47:32 (zilvia)\",\n            \"vehDepart\": \"lv1 u4\",\n            \"vehicle\": \"GS-Tester-A-0762\",\n            \"version\": \"3\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11802",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Maintenance"
  },
  {
    "type": "post",
    "url": "/api/tripDrvImport",
    "title": "Import Trip Driver",
    "name": "VEHICLE_TRIP___IMPORT_DRIVER",
    "group": "TripSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "tripDrv",
            "description": "<p>List of trip driver data (Trip ID, Driver Code)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>Import count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_11806",
            "description": "<p>Some record not updated</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_11807",
            "description": "<p>Some driver not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_11808",
            "description": "<p>No driver exist in company or department</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10809",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Unauthorized\",\n    \"code\": 1xxxx,\n    \"data\": [1, 3, 4]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Maintenance"
  },
  {
    "type": "patch",
    "url": "/api/tripDrvUpdate",
    "title": "Update Trip Driver",
    "name": "VEHICLE_TRIP___UPDATE_DRIVER",
    "group": "TripSet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "driverId",
            "description": "<p>Device SN</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "tripId",
            "description": "<p>Vehicle id</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Data version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "SuccessResponse:",
            "description": "<p>HTTP/1.1 200 OK { &quot;message&quot;: &quot;Success&quot; }</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10803",
            "description": "<p>No record affected</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10804",
            "description": "<p>MySql error (duplicate key)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10805",
            "description": "<p>MySql error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Trip Maintenance"
  },
  {
    "type": "delete",
    "url": "/userroleSet",
    "title": "Delete User Role",
    "name": "USERROLE___DELETE_USERROLE",
    "group": "User_Group_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "group_id",
            "description": "<p>Group ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11006",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11007",
            "description": "<p>Fail (has linked record)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11008",
            "description": "<p>Fail (SQL execute return false)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11009",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Group_Settings"
  },
  {
    "type": "patch",
    "url": "/userroleSet",
    "title": "Edit User Role",
    "name": "USERROLE___EDIT_USERROLE",
    "group": "User_Group_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "group_name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "group_id",
            "description": "<p>Group ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Role version</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "userFunc",
            "description": "<p>Editing function</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11004",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11005",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11011",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Group_Settings"
  },
  {
    "type": "post",
    "url": "/userroleSet",
    "title": "Add User Role",
    "name": "USERROLE___GET_USERROLE",
    "group": "User_Group_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "group_name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "group_id",
            "description": "<p>Group ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "userFunc",
            "description": "<p>Editing function</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11002",
            "description": "<p>Fail (no insert ID)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11003",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_11010",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Group_Settings"
  },
  {
    "type": "get",
    "url": "/userroleSet",
    "title": "Get User Role",
    "name": "USERROLE___GET_USERROLE",
    "group": "User_Group_Settings",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Data of user role</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "compFunc",
            "description": "<p>Function</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n\t\t\"message\":\"Success\",\n\t\t\"data\":\n\t\t[\n\t\t\t{\n\t\t\t\t\"roleId\":4,\n\t\t\t\t\"roleName\":\"Chun Wo User\",\n\t\t\t\t\"updated_by\":\"2018-10-03 18:28:27 (zilvia)\",\n\t\t\t\t\"version\":\"5\",\n\t\t\t\t\"userFunc\":[\"WARNING_MAP\",\"USER_MAINT\"]\n\t\t\t},\n\t\t],\n\t\t\"compFunc\":\n\t\t[\n\t\t\t\"COMPANY_PROFILE\",\n\t\t\t\"DEVICE_MAINT\",\n\t\t\t\"DRIVER_GRP_MAINT\",\n\t\t\t\"DRIVER_GRP_PROFILE\",\n\t\t\t\"DRIVER_MAINT\",\n\t\t\t\"DRIVER_PROFILE\",\n\t\t\t\"LIVE_LOCATION\",\n\t\t\t\"MAIL_NOTIFY_MAINT\",\n\t\t\t\"ORG_CHART_MAINT\",\n\t\t\t\"ROSTER_MAINT\",\n\t\t\t\"TRIP_DRV_IMPORT\",\n\t\t\t\"USER_MAINT\",\n\t\t\t\"USER_ROLE_MAINT\",\n\t\t\t\"VEHICLE_GRP_MAINT\",\n\t\t\t\"VEHICLE_GRP_PROFILE\",\n\t\t\t\"VEHICLE_MAINT\",\n\t\t\t\"VEHICLE_PROFILE\",\n\t\t\t\"VEHICLE_TRIP_MAINT\",\n\t\t\t\"VIDEO_BATCH_DOWNLOAD\",\n\t\t\t\"VRM_MAINT\",\n\t\t\t\"WARNING_EXPORT\",\n\t\t\t\"WARNING_MAP\"\n\t\t]\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_11001",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Group_Settings"
  },
  {
    "type": "post",
    "url": "/userSet",
    "title": "Add user",
    "name": "USER___ADD_USER",
    "group": "User_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "fullname",
            "description": "<p>Fullname</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "group_id",
            "description": "<p>Group ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Department ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Language</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "map",
            "description": "<p>Map</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10903",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10904",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10909",
            "description": "<p>Username already exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10910",
            "description": "<p>Add password history fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10911",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Settings"
  },
  {
    "type": "delete",
    "url": "/userSet",
    "title": "Delete user",
    "name": "USER___DELETE_USER",
    "group": "User_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10907",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10908",
            "description": "<p>SQL errors</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Settings"
  },
  {
    "type": "patch",
    "url": "/userSet",
    "title": "Edit user",
    "name": "USER___EDIT_USER",
    "group": "User_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "fullname",
            "description": "<p>Fullname</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "group_id",
            "description": "<p>Group ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Department ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Language</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "map",
            "description": "<p>Map</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Version</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10905",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10906",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10912",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Settings"
  },
  {
    "type": "get",
    "url": "/userSet",
    "title": "Get User",
    "name": "USER___GET_USER",
    "group": "User_Settings",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department Object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.department",
            "description": "<p>Name of department</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.id",
            "description": "<p>Department ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fullName",
            "description": "<p>User name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.groupname",
            "description": "<p>Group information object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupname.group_id",
            "description": "<p>Group ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupname.groupname",
            "description": "<p>Group Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lang",
            "description": "<p>Language</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.lastLogin",
            "description": "<p>Last login timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.map",
            "description": "<p>Map</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.retryLogin",
            "description": "<p>Number of login retry</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>Account status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Update timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.userId",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Version</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "departments",
            "description": "<p>Department List Objects</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.id",
            "description": "<p>Department ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"version\":\"0\",\n            \"userId\":1,\n            \"username\":\"antonio\",\n            \"fullName\":\"Antonio Wong\",\n            \"lang\":\"en\",\n            \"map\":\"googleMap\",\n            \"lastLogin\":\"2018-12-12 14:00:52\",\n            \"retryLogin\":0,\n            \"status\":\"A\",\n            \"email\":null,\n            \"updated_by\":\"2019-01-14 13:17:05 (SYSTEM)\",\n            \"groupname\":\n                {\n                    \"groupname\":\"test permission\",\n                    \"group_id\":\"139\"\n                },\n            \"department\":\n                {\n                    \"department\":\"Root\",\n                    \"id\":\"5\"\n                }\n        }\n    ],\n    \"departments\": [\n        {\n            \"department\":\"lv2 u6\",\n            \"id\":\"49\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10902",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Settings"
  },
  {
    "type": "get",
    "url": "/userAddL",
    "title": "Get User Groups and Departments",
    "name": "USER___GET_USER_GRPS___DEPARTMENTS",
    "group": "User_Settings",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group_id",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Group data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupname",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.group_id",
            "description": "<p>Group ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"groupname\":\"ADVANCED USER\",\n            \"group_id\":\"138\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10901",
            "description": "<p>SQL errors</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "User_Settings"
  },
  {
    "type": "patch",
    "url": "/vehiclegrpSet",
    "title": "Edit Vehicle Detail",
    "name": "VEHICLEGRP___ADD_VEHICLE_GRP",
    "group": "Vehicle_Group_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_alias",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_descp",
            "description": "<p>Group description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Department ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vrm_grp_id",
            "description": "<p>Vehicle group ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Version</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehicleBelong",
            "description": "<p>Vehicle list</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehicleBelong.id",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehicleBelong.licence",
            "description": "<p>Vehicle licence</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10705",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10706",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10712",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Group_Settings"
  },
  {
    "type": "post",
    "url": "/vehiclegrpSet",
    "title": "Add Vehicle Detail",
    "name": "VEHICLEGRP___ADD_VEHICLE_GRP",
    "group": "Vehicle_Group_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_alias",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "grp_descp",
            "description": "<p>Group description</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Department ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehicleBelong",
            "description": "<p>Vehicle list</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehicleBelong.id",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vehicleBelong.licence",
            "description": "<p>Vehicle licence</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10703",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10704",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10711",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Group_Settings"
  },
  {
    "type": "delete",
    "url": "/vehiclegrpSet",
    "title": "Delete Vehicle Detail",
    "name": "VEHICLEGRP___DELETE_VEHICLE_GRP",
    "group": "Vehicle_Group_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "vrm_grp_id",
            "description": "<p>Group ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10707",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10708",
            "description": "<p>Fail (has linked record)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10709",
            "description": "<p>Fail (SQL execute return false)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10710",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Group_Settings"
  },
  {
    "type": "get",
    "url": "/vehiclegrpAddL",
    "title": "Get Vehicle List",
    "name": "VEHICLEGRP___GET_VEHICLE_GRP",
    "group": "Vehicle_Group_Settings",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>Vehicle list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n     \"message\": \"Success\",\n     \"data\": [\n\t\t\t{\n\t\t\t\t\"id\": \"2337\",\n\t\t\t\t\"licence\": \"1001-1800-1138-cfac\"\n\t\t\t}\n\t\t]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10701",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Group_Settings"
  },
  {
    "type": "get",
    "url": "/vehiclegrpSet",
    "title": "Get Vehicle Detail",
    "name": "VEHICLEGRP___GET_VEHICLE_GRP",
    "group": "Vehicle_Group_Settings",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Vehicle group information</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.id",
            "description": "<p>Department ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupDesc",
            "description": "<p>Group description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.groupName",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Update timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.vehicleBelong",
            "description": "<p>Vehicle member</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicleBelong.id",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicleBelong.licence",
            "description": "<p>Vehicle licence</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehiclegrpId",
            "description": "<p>Vehicle group ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Version</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "departments",
            "description": "<p>Department List</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.id",
            "description": "<p>Department ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"vehiclegrpId\":1,\n            \"groupName\":\"VEH_GRP_A\",\n            \"groupDesc\":\"Vehicle Group A\",\n            \"updated_by\":\"2018-09-14 16:57:44 (zilvia)\",\n            \"version\":\"2\",\n            \"vehicleBelong\": [\n                {\n                    \"id\":\"17\",\n                    \"licence\":\"LE3415\"\n                }\n            ],\n            \"department\":\n                {\n                    \"department\":\"Root\",\n                    \"id\":\"5\"\n                }\n        }\n    ],\n    \"departments\": [\n        {\n            \"department\": \"8\",\n            \"id\": \"265\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10702",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Group_Settings"
  },
  {
    "type": "post",
    "url": "/vehiclegrpImport",
    "title": "Import Vehicle Group",
    "name": "VEHICLEGRP___IMPORT_VEHICLE_GRP",
    "group": "Vehicle_Group_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "-",
            "description": "<p>File stream</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "add_group_count",
            "description": "<p>Number of group added</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "add_vehicle_count",
            "description": "<p>Number of vehicle added</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"add_group_count\": 10,\n    \"add_vehicle_count\": 100\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10713",
            "description": "<p>Empty CSV file</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10714",
            "description": "<p>Not ASCI or UTF-8</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10715",
            "description": "<p>Wrong pattern</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10716",
            "description": "<p>Department not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10717",
            "description": "<p>Read CSV fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10718",
            "description": "<p>Upload file error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10719",
            "description": "<p>Vehicle group not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10720",
            "description": "<p>License not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10721",
            "description": "<p>Nothing added</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10722",
            "description": "<p>Duplicate key</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10723",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10724",
            "description": "<p>Duplicate group name</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10725",
            "description": "<p>Duplicate driver in one group</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10726",
            "description": "<p>File not sorted</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10727",
            "description": "<p>Some group not added</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10728",
            "description": "<p>Some veh not added</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\",\n    \"data\": [1,3,6,8,20]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Group_Settings"
  },
  {
    "type": "post",
    "url": "/vehicleSet",
    "title": "Add Vehicle",
    "name": "VEHICLE___ADD_VEHICLE",
    "group": "Vehicle_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vrm_mark_code",
            "description": "<p>Vehicle mark code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Vehicle status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vehicle_id",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Department ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10803",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10804",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10810",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Settings"
  },
  {
    "type": "delete",
    "url": "/vehicleSet",
    "title": "Delete Vehicle",
    "name": "VEHICLE___DELETE_VEHICLE",
    "group": "Vehicle_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vrm_id",
            "description": "<p>Vehicle ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10807",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10808",
            "description": "<p>Fail (has linked record)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10809",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\",\n    \"data\": [1,3,6,8,20]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Settings"
  },
  {
    "type": "patch",
    "url": "/vehicleSet",
    "title": "Edit Vehicle",
    "name": "VEHICLE___EDIT_VEHICLE",
    "group": "Vehicle_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vrm_id",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vrm_mark_code",
            "description": "<p>Vehicle mark code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Vehicle status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vehicle_id",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Version</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "ou_id",
            "description": "<p>Department ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10805",
            "description": "<p>Fail (no row affected)</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10806",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UpdateFailure_10811",
            "description": "<p>SQL error (duplicate key)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Settings"
  },
  {
    "type": "get",
    "url": "/vehicleSet",
    "title": "Get Vehicle",
    "name": "VEHICLE___GET_VEHICLE",
    "group": "Vehicle_Settings",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Vehicle list</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.department",
            "description": "<p>Department Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.department.id",
            "description": "<p>Department ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.licence",
            "description": "<p>Vehicle licence</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicleId",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>Vehicle status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_by",
            "description": "<p>Last update timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.vehicle",
            "description": "<p>Vehicle object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicle.vehicle",
            "description": "<p>Vehicle name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehicle.vehicle_id",
            "description": "<p>Vehicle ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.version",
            "description": "<p>Version</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "departments",
            "description": "<p>Department List</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "departments.id",
            "description": "<p>Department ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"vehicleId\":10,\n            \"status\":\"A\",\n            \"version\":\"0\",\n            \"licence\":\"RA8326\",\n            \"updated_by\":\"2016-09-07 17:14:46 (SYSTEM)\",\n            \"vehicle\":\n                {\n                    \"vehicle\":null,\n                    \"vehicle_id\":null\n                },\n            \"department\":\n                {\n                    \"department\":\"Root\",\n                    \"id\":\"5\"\n                }\n        }\n    ],\n    \"departments\": [\n        {\n            \"department\": \"8\",\n            \"id\": \"265\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10802",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Settings"
  },
  {
    "type": "get",
    "url": "/vehicleAddL",
    "title": "Get Vehicle Type Detail",
    "name": "VEHICLE___GET_VEHICLE_DTL",
    "group": "Vehicle_Settings",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Vehicle list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>Vehicle type ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.veh_type",
            "description": "<p>Vehicle type name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"id\": \"80\",\n            \"veh_type\": \"CAR\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10801",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Settings"
  },
  {
    "type": "post",
    "url": "/vehicleImport",
    "title": "Import Vehicle Detail",
    "name": "VEHICLE___IMPORT_VEHICLE",
    "group": "Vehicle_Settings",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "-",
            "description": "<p>File stream</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>Import count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10812",
            "description": "<p>Empty CSV file</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10813",
            "description": "<p>Not ASCI or UTF-8</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10814",
            "description": "<p>Wrong pattern</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10815",
            "description": "<p>Department not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10816",
            "description": "<p>Vehicle type not exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10817",
            "description": "<p>Nothing added</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10818",
            "description": "<p>Duplicate key</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_10819",
            "description": "<p>SQL error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10820",
            "description": "<p>Read CSV fail</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10821",
            "description": "<p>Upload file error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10822",
            "description": "<p>Licence already exist</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ImportFailure_10823",
            "description": "<p>VIN already exist</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\",\n    \"data\": [1,3,6,8,20]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Vehicle_Settings"
  },
  {
    "type": "get",
    "url": "/filterListData",
    "title": "Get Filter List Data",
    "name": "EXPORT_WARNING_DATA___GET_FILTER_LIST_DATA",
    "group": "WarnDataExport",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>List of filter list</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.brandList",
            "description": "<p>List of vehicle brand</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.brandList.brand",
            "description": "<p>Vehicle brand</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.deptList",
            "description": "<p>List of department</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.id",
            "description": "<p>ID of the department</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.name",
            "description": "<p>Name of the department</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.parent",
            "description": "<p>Parent of the department</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.deptList.children",
            "description": "<p>Children of the department</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.children.id",
            "description": "<p>Children ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.children.name",
            "description": "<p>Children name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deptList.children.parent",
            "description": "<p>Parent ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.drvGrp",
            "description": "<p>List of driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvGrp.id",
            "description": "<p>ID of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvGrp.name",
            "description": "<p>Name of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.drvList",
            "description": "<p>List of driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvList.grp_id",
            "description": "<p>Driver group ID the driver belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvList.id",
            "description": "<p>ID of of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvList.name",
            "description": "<p>Name of the driver group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.drvList.ou_id",
            "description": "<p>Department ID the driver belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.modelList",
            "description": "<p>List of vehicle model</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.modelList.model",
            "description": "<p>Vehicle model</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.vehGrp",
            "description": "<p>List of vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehGrp.id",
            "description": "<p>ID of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehGrp.name",
            "description": "<p>Name of the vehicle group</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.vehList",
            "description": "<p>List of vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.brand",
            "description": "<p>Brand of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.grp_id",
            "description": "<p>Vehicle group ID the vehicle belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.id",
            "description": "<p>ID of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.model",
            "description": "<p>Model of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.name",
            "description": "<p>Name of the vehicle</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.ou_id",
            "description": "<p>Department ID the vehicle belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehList.type_id",
            "description": "<p>Vehicle type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.vehtypeList",
            "description": "<p>List of vehicle type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehtypeList.id",
            "description": "<p>ID of the vehicle type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vehtypeList.name",
            "description": "<p>Name of the vehicle type</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.wtList",
            "description": "<p>List of warning type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.wtList.id",
            "description": "<p>ID of warning type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.wtList.name",
            "description": "<p>Name of warning type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.wtList.parent",
            "description": "<p>Parent of warning type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"brandList\": {\n            \"brand\": \"123\"\n        },\n        \"deptList\": [\n             {\n                \"id\":\"5\",\n                \"name\":\"Root\",\n                \"parent\":null,\n                \"children\": [\n                   {\n                        \"id\":\"7\",\n                        \"name\":\"lv1 u1\",\n                        \"parent\":\"5\",\n                        \"children\": [\n                            {\n                                \"id\":\"449\",\n                                \"name\":\"ant\",\n                                \"parent\":\"7\"\n                            }\n                        ]\n                    }\n                ]\n            }\n        ],\n        \"drvGrp\": [\n            {\n                \"id\":\"197\",\n                \"name\":\"CSV Testing\"\n            }\n        ],\n        \"drvList\": [\n            {\n                \"id\":\"11753\",\n                \"name\":\"2223 [Root]\",\n                \"ou_id\":\"5\",\n                \"grp_id\":null\n            }\n        ],\n        \"modelList\": [\n            {\n                \"model\":\"132\"\n            }\n        ],\n        \"vehGrp\": [\n            {\n                \"id\": \"123\",\n                \"name\": \"123\"\n            }\n        ],\n        \"vehList\": [\n            {\n                \"id\":\"2337\",\n                \"name\":\"1001-1800-1138-cfac [Root]\",\n                \"ou_id\":\"5\",\n                \"brand\":\"Test\",\n                \"model\":\"Car\",\n                \"type_id\":\"1\",\n                \"grp_id\":null\n            }\n        ],\n        \"vehtypeList\": [\n            {\n                \"id\":\"2\",\n                \"name\":\"CAR\"\n            }\n        ],\n        \"wtList\": [\n            {\n                \"id\":\"2\",\n                \"name\":\"PCW\",\n                \"parent\":null\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_12101",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Warning Data Export"
  },
  {
    "type": "post",
    "url": "/api/warningRawData",
    "title": "Get Warning Data",
    "name": "EXPORT_WARNING_DATA___GET_RAW_WARNING_DATA",
    "group": "WarnDataExport",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start date</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>End date</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Language</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "dataFilename",
            "description": "<p>Warning data filename</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "wt",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "driverTag",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "driver",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "vehicle",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "duration",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "startSpd",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "endSpd",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "topSpd",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "hw",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "nearHW",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "state",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "stateFlag",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "video",
            "description": ""
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": true,
            "field": "runDistance",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>URL for download file</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"url\": \"http://dgdsweb04/api/download/V2FybmluZ0RhdGFfMjAxOTAzMjE%3D/csv/L3RtcC9kYXRhYjJVbjlG\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_12102",
            "description": "<p>Cannot create file</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_12103",
            "description": "<p>SQL error</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Warning Data Export"
  },
  {
    "type": "post",
    "url": "/api/getVideoArchive",
    "title": "Get Warning Video Archive",
    "name": "VIDEO_DOWNLOAD___GET_VIDEO_ARCHIVE",
    "group": "WarnVideoBatch",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "archiveFilename",
            "description": "<p>Archive filename</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoPrefix",
            "description": "<p>Video filename prefix</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "videoArray",
            "description": "<p>List of video id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>URL for download file</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"url\": \"http://dgdsweb04/api/download/eXl5/zip/L3RtcC92aWRlb0FyY2hpdmVLRWZsY3U%3D\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_12001",
            "description": "<p>Cannot create zip file</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_12002",
            "description": "<p>Incorrect video ID</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InternalError_12003",
            "description": "<p>MongoDB error</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "RequestError_12004",
            "description": "<p>Empty result or out of range</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidSession_10004",
            "description": "<p>Unauthorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Fail\",\n    \"code\": \"1xxxx\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Unauthorized\",\n    \"code\": \"10004\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "documentation/api/apidoc.js",
    "groupTitle": "Warning Video Download"
  }
] });
