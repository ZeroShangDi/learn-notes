const fs = require('fs-extra');
const path = require('path');

const docsDir = path.join(__dirname, '/');
const targetDir = path.join(__dirname, '/../前端面试题整理-GTP版'); // 替换为你的 Markdown 文件夹路径

function generateSidebar(dir, basePath = '') {
  let sidebarContent = '';
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const relativePath = path.join(basePath, item).replace(/\\/g, '/');
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      sidebarContent += `- ${item}\n${generateSidebar(itemPath, relativePath)}`;
    } else if (stat.isFile() && path.extname(item) === '.md') {
      sidebarContent += `  - [${path.basename(item, '.md')}](${relativePath})\n`;
    }
  });

  return sidebarContent;
}

const sidebar = generateSidebar(targetDir);
fs.writeFileSync(path.join(docsDir, '_sidebar.md'), sidebar);
console.log('Sidebar generated successfully.');
