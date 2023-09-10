解锁新技能～开发一个脚手架工具
## 代码
```js

#!/usr/bin/env node

const yParser = require('yargs-parser');
const semver = require('semver');
const chalk = require('chalk');
const run = require('./lib/run');

//命令行运行 node cli aaa bbb ccc --bar=0 --foo=1 则 args = {_:[ 'aaa', 'bbb', 'ccc' ], bar: 0, foo: 1}
const args = yParser(process.argv.slice(2));

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

// ============= 提取命令行参数 =============
const name = args._[0] || '';
if (name) args._.shift();
const { type } = args;
delete args.type;


// ============= 运行 =============
run({name,type,args,})
.then(() => { process.exit(0) })
.catch((e) => {
  console.error(chalk.red(`> Generate failed`), e);
  process.exit(1);
});


```
```js
const path = require('path');
const mkdirp = require('mkdirp');
const yeoman = require('yeoman-environment');
const Generator = require('./SimpleGenerator');



const runGenerator = async ({ name = '',type, args = {} }) => {
  let cwd = process.cwd()
  // console.log(chalk.bgBlueBright(`name=: ${name}`));
  // console.log(chalk.bgBlueBright(`type=: ${type}`));
  // console.log(chalk.bgBlueBright(`args=: ${JSON.stringify(args)}`));
  
  return new Promise(resolve => {
    if (name) {
      mkdirp.sync(name); // 如果提供了名称，则创建一个同名文件夹
      cwd = path.join(cwd, name); // 更新当前工作目录路径
    }

    // yeoman 是一个脚手架工具 ，后面这段代码就当固定写法吧，不用细纠
    const env = yeoman.createEnv([], {
      cwd,
    });
    const generator = new Generator({
      name,
      type,
      env,
      resolved: require.resolve('./SimpleGenerator'),
      args,
    });

    
   generator.run((cb) => {
      console.log('✨ 一切就绪');
      resolve(true); // 所有工作完成后
    });
  });
};



module.exports = runGenerator;

```
```js
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const prettier = require('prettier');
const Generator = require('yeoman-generator');

function log(...args) {
  console.log(`${chalk.gray('>')}`, ...args);
}

const tplUrlMap = {
  'vue-h5-tpl': 'git@github.com:KittyFairy-Han/vue-sell.git',
  'angular-tpl': 'git@github.com:KittyFairy-Han/angular-hero.git',
  'jquery-tpl': 'git@github.com:KittyFairy-Han/littleHdu.git',
  'vue-echart-tpl': 'git@github.com:KittyFairy-Han/data-collection-visible.git',
};

const tplChoices = [
  {
    name: 'vue-echart-tpl: 基于 echarts 的 PC 端项目模板，包含数据可视化',
    value: 'vue-echart-tpl',
  },
  {
    name: 'vue-h5-tpl: 基于 vue 的移动端 H5 项目模板',
    value: 'vue-h5-tpl',
  },
  {
    name: 'angular-tpl: 基于 angular 的 PC 端项目模板',
    value: 'angular-tpl',
  },
  {
    name: 'jquery-tpl: 基于 jquery 的古早项目模板',
    value: 'jquery-tpl',
  },
];

class AntDesignProGenerator extends Generator {
  constructor({ name, type, ...opts }) {
    // opts = {env,resolved,args}

    super(opts);
    this.opts = opts;
    this.name = name;
    this.type = type;
  }
  async prompting() {
    // log(`🪜 生成器准备结束 开始界面交互`);
    const questions = [
      {
        name: 'tpl',
        type: 'list',
        choices: tplChoices,
        message: '🧙 请选择模板',
        default: this.type,
      },
      {
        name: 'name',
        message: `请填写项目名称`,
        default: this.name,
      },
      {
        name: 'remote',
        message: `你项目的远程仓库地址？（可选填）`,
      },
    ];
    // 这两行代码的目的是通知父进程当前进程已经准备好进行交互，或者可以开始接受来自父进程的指令或消息。
    // 这种通信机制在命令行工具和它的子进程之间很常见，用于控制命令行界面的交互行为。
    process.send && process.send({ type: 'prompt' });
    process.emit('message', { type: 'prompt' });
    const answers = await super.prompt(questions);

    this.answers = answers;
    // log(`🪜 界面交互结束 准备拉取模板`);
    log(`⚙️ 准备就绪！`);
  }

  async writing() {
    /** 切换环境 */
    // console.log(chalk.bgBlueBright(`answers=: ${JSON.stringify(this.answers)}`));
    const projectName = this.answers.name || this.opts.env.cwd; //如果用户提供了项目名称，就使用该名称；否则使用当前工作目录的名称作为项目名称。
    const projectPath = path.resolve(projectName); //将项目名称解析为绝对路径，得到项目的完整路径。
    const projectRemote = this.answers.remote;
    // log('📁 准备写入文件到：', projectPath);

    /** 一些检查 */
    const yoConfigPth = path.join(projectPath, '.yo-repository');
    if (fs.existsSync(yoConfigPth)) rimraf.sync(yoConfigPth); // 删除 .yo-repository

    if (
      fs.existsSync(projectPath) &&
      fs.statSync(projectPath).isDirectory() &&
      fs.readdirSync(projectPath).length > 0
    ) {
      console.log('\n');
      console.log(`🙈 ${chalk.red('请在空文件夹中使用')}`);
      process.exit(1);
    } //检查项目路径是否为空

    /** 拉代码 */
    const githubUrl = tplUrlMap[this.answers.tpl];
    const gitArgs = [`clone`, githubUrl, `--depth=1`, projectName]; //--depth=1 参数指定克隆仓库的深度，只获取最近一次提交的内容，以加快克隆速度。
    this.spawnCommandSync('git', gitArgs);

    log(`🚚 clone 成功！`);

    /** 处理文件 */
    try {
      const packageJsonPath = path.resolve(projectPath, 'package.json');
      const pkg = require(packageJsonPath); //package.json 读取成一个对象
      // console.log(`🙈 ${JSON.stringify(pkg)}`);
      pkg.name = projectName; //修改 package.json 中的内容
      pkg.remote = projectRemote;
      fs.writeJSONSync(packageJsonPath, pkg);
      const formattedCode = prettier.format(fs.readFileSync(packageJsonPath, 'utf8'), {
        parser: 'json',
      });
      fs.writeFileSync(packageJsonPath, formattedCode);
    } catch (error) {
      log(`🙈 ${chalk.yellow('package.json 不存在，代码模板可能存在问题')}`);
    }


    const gitFolderPath = path.resolve(projectPath, '.git'); // 删除整个 .git 目录
    fs.removeSync(gitFolderPath);




    /** 关联新的 git */
    if (projectRemote) {
      this.spawnCommandSync('git', ['init'], { cwd: projectPath });
      this.spawnCommandSync('git', ['add', '.'], { cwd: projectPath });
      this.spawnCommandSync('git', ['commit', '-m', 'init'], { cwd: projectPath });
      this.spawnCommandSync('git', ['remote', 'add', 'origin', projectRemote], {
        cwd: projectPath,
      });
      this.spawnCommandSync('git', ['pull', '--rebase', 'origin', 'main'], { cwd: projectPath });
      log('🔗 git 仓库关联成功！请刷新 git 工具查看是否有冲突文件');
    }
  }
}

module.exports = AntDesignProGenerator;

```