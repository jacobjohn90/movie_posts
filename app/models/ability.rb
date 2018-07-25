class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    can :read, Comment

    can [:destroy], Comment do |post|
      post.user == user
    end
  end
end
