module.exports = {

	"helpers": {
		"if_or": function (v1, v2, options) {
			if (v1 || v2) {
				return options.fn(this);
			}

			return options.inverse(this);
		}
	},
	"prompts": {
		"name": {
			"type": "string",
			"required": true,
			"message": "项目名称"
		},
		"description": {
			"type": "string",
			"required": false,
			"message": "项目描述信息",
			"default": "A Vue.js project"
		},
		"author": {
			"type": "string",
			"message": "作者"
		}
	},
	"completeMessage": "请按步骤运行以下命令:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\n文档说明见https://github.com/ztjy-fe/admin-scaffolding2"
};
