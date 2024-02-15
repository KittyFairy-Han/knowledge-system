const pkg = require("../package.json");
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const subTitleMap = [["3d", "3d相关"], ["validators", "表单验证"]]
function getFileNames(parentDir, filterFn) {
  return fs
    .readdirSync(parentDir, { withFileTypes: true })
    .filter(filterFn)
    .map((dirent) => dirent.name);
}
function getMethodFiles() {
  let methodFiles = [];
  const toolsDir = path.join(__dirname, "../tools");
  const subNames = getFileNames(toolsDir, (dirent) => dirent.isDirectory());
  console.log("✨ subNames：", subNames);
  for (const subName of subNames) {
    const subDir = path.join(toolsDir, subName);
    const methodNames = getFileNames(subDir, (dirent) => dirent.isFile() && dirent.name.endsWith(".ts"));
    console.log("✨ methodNames：", methodNames);
    for (const methodFileName of methodNames) {
      const method = path.join(subDir, methodFileName);
      methodFiles.push({ subName, methodFileName, method, subDir });
    }
  }
  return methodFiles;
}
function updateVersion() {
  const version = pkg.version.split(".");
  version[2] = Number(version[2]) + 1;
  return version.join(".");
}
function getSubTitle(subName) {
  return subTitleMap.find(([key]) => key === subName)?.[1] || subName;
}
function parseContent(filePath, methodName) {
  // const filePath = path.join(__dirname, "a.ts");
  // const methodName = "myFunction";
  const sourceFile = ts.createSourceFile(filePath, fs.readFileSync(filePath).toString(), ts.ScriptTarget.Latest, true);
  let obj = {
    title: methodName,
    parameters: [],
    properties: [],
  }
  // 获取 jsDoc
  // TODO 用ts.visit可以减少遍历次数
  let jsDoc
  ts.forEachChild(sourceFile, (node) => {
    const jsDocComments = ts.getJSDocCommentsAndTags(node);
    if (jsDocComments.length > 0 && !jsDoc) {
      jsDoc = jsDocComments[0];
    }
  });
  if (!jsDoc || !jsDoc.tags.length) return obj;

  // 解析 jsDoc
  for (const tag of jsDoc.tags || []) {
    if (tag.tagName.text === "title") {
      obj.title = tag.comment
    }
    if (tag.tagName.text === "description") {
      obj.description = tag.comment
    }
    if (tag.tagName.text === "param") {
      const type = tag.typeExpression ? tag.typeExpression.type.getText() : null;
      const name = tag.name.getText();
      const desc = tag.comment || null;
      obj.parameters.push({ type, name, desc });
    }

    if (tag.tagName.text === "returns") {
      obj.returns = tag.comment
    }

    if (tag.tagName.text === "property") {

      let match = tag.comment.match(/{(.+?)}\s+(.+?)\s+(.+)/);
      // console.log('match:', match);
      const [_, type, name, desc] = match;
      obj.properties.push({ type, name, desc });
      
    }
  }

  return obj;
}
module.exports = { getMethodFiles, updateVersion, parseContent, getSubTitle, getFileNames };
