module.exports = {
  up: queryInterface => queryInterface.addConstraint(
    'project_skills',
    ['project_id', 'skill_id'],
    {
      type: 'unique',
      name: 'project_skills_project-skill_unique_index',
    },
  ),

  down: queryInterface => queryInterface.removeConstraint(
    'project_skills',
    'project_skills_project-skill_unique_index',
  ),
};
