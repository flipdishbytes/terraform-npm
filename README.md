# terraform-npm (forked from https://github.com/steven-xie/terraform-npm)
*An NPM executable package for HashiCorp's Terraform and TFLint*

### Preamble
I assembled [Terraform](https://terraform.io) into an NPM package in order for me to include it in other projects that depended on the executable. I wanted to be able to publish NPM modules with scripts like this:
```json
{
  "scripts": {
    "plan": "terraform plan -out=my-tfplan",
    "lint": "tflint --init && tflint --format compact"
  }
}
```
But without having to worry about asking users to download Terraform externally.

---

### Installation
To use *Terraform* and *TFLint* as an NPM package, include it in your `package.json` dependencies:
```bash
# If you're using Yarn (recommended):
yarn add @flipdish_devops/terraform

# If you're using NPM:
npm i @flipdish_devops/terraform
```

Or, if you want a one-time installation that you can run arbitrarily, install it globally:
```bash
# If you're using Yarn (recommended):
yarn global add @flipdish_devops/terraform

# If you're using NPM:
npm i -g @flipdish_devops/terraform
```


## Usage
#### As a project dependency:
This package cannot currently be used as a typical Node module, as it does not export any entry points; it only symlinks a binary. So, the recommended use case is to use it in your `package.json` scripts:
```json
{
    "scripts": {
        "plan": "terraform plan -out=my-tfplan",
        "apply": "terraform apply",
        "execute": "terraform apply \"my-tfplan\"",
        "destroy": "terraform destroy",
        "lint": "tflint --init && tflint --format compact"
    }
}
```

#### As a globally installed binary:
If you installed this package globally (with `npm i -g` or `yarn global add`), you can simply start using it like a regular command-line program:
```bash
terraform -v        # show version info
terraform --help    # show usage info
```
